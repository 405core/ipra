package archive

import (
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"sort"
	"strings"
	"time"

	"ipra/backend/internal/config"
)

var (
	errMinIONotConfigured = errors.New("minio is not configured")
	errObjectNotFound     = errors.New("minio object not found")
)

const unsignedPayloadHash = "UNSIGNED-PAYLOAD"

type objectStorage interface {
	StatObject(ctx context.Context, bucket string, objectKey string) error
	GetObject(ctx context.Context, bucket string, objectKey string, rangeHeader string) (*http.Response, error)
	PutObject(ctx context.Context, bucket string, objectKey string, body io.Reader, size int64, contentType string) error
}

type minioClient struct {
	endpoint  string
	accessKey string
	secretKey string
	secure    bool
	client    *http.Client
	now       func() time.Time
}

func newMinIOClient(cfg config.MinIOConfig) objectStorage {
	endpoint := strings.TrimSpace(cfg.Endpoint)
	accessKey := strings.TrimSpace(cfg.AccessKey)
	secretKey := strings.TrimSpace(cfg.SecretKey)
	if endpoint == "" || accessKey == "" || secretKey == "" {
		return nil
	}

	return &minioClient{
		endpoint:  strings.TrimRight(endpoint, "/"),
		accessKey: accessKey,
		secretKey: secretKey,
		secure:    cfg.Secure,
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
		now: time.Now,
	}
}

func (c *minioClient) StatObject(ctx context.Context, bucket string, objectKey string) error {
	response, err := c.do(ctx, http.MethodHead, bucket, objectKey, "")
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode == http.StatusNotFound {
		return errObjectNotFound
	}
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		return fmt.Errorf("minio stat object returned %s", response.Status)
	}
	return nil
}

func (c *minioClient) GetObject(ctx context.Context, bucket string, objectKey string, rangeHeader string) (*http.Response, error) {
	response, err := c.do(ctx, http.MethodGet, bucket, objectKey, rangeHeader)
	if err != nil {
		return nil, err
	}
	if response.StatusCode == http.StatusNotFound {
		_ = response.Body.Close()
		return nil, errObjectNotFound
	}
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		body, _ := io.ReadAll(io.LimitReader(response.Body, 512))
		_ = response.Body.Close()
		return nil, fmt.Errorf("minio get object returned %s: %s", response.Status, strings.TrimSpace(string(body)))
	}
	return response, nil
}

func (c *minioClient) PutObject(
	ctx context.Context,
	bucket string,
	objectKey string,
	body io.Reader,
	size int64,
	contentType string,
) error {
	if c == nil {
		return errMinIONotConfigured
	}
	if body == nil {
		return errors.New("object body is required")
	}
	if size <= 0 {
		return errors.New("object size must be greater than 0")
	}

	requestURL, canonicalURI, err := c.objectURL(bucket, objectKey)
	if err != nil {
		return err
	}

	request, err := http.NewRequestWithContext(ctx, http.MethodPut, requestURL, body)
	if err != nil {
		return err
	}
	request.ContentLength = size
	if strings.TrimSpace(contentType) != "" {
		request.Header.Set("Content-Type", strings.TrimSpace(contentType))
	}
	payloadHash := unsignedPayloadHash
	if readSeeker, ok := body.(io.ReadSeeker); ok {
		payloadHash, err = sha256ReaderHex(readSeeker)
		if err != nil {
			return err
		}
		if _, err := readSeeker.Seek(0, io.SeekStart); err != nil {
			return fmt.Errorf("rewind object body: %w", err)
		}
	}
	c.signWithPayloadHash(request, http.MethodPut, canonicalURI, payloadHash)

	response, err := c.client.Do(request)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode < 200 || response.StatusCode >= 300 {
		body, _ := io.ReadAll(io.LimitReader(response.Body, 512))
		return fmt.Errorf("minio put object returned %s: %s", response.Status, strings.TrimSpace(string(body)))
	}
	return nil
}

func (c *minioClient) do(ctx context.Context, method string, bucket string, objectKey string, rangeHeader string) (*http.Response, error) {
	if c == nil {
		return nil, errMinIONotConfigured
	}

	requestURL, canonicalURI, err := c.objectURL(bucket, objectKey)
	if err != nil {
		return nil, err
	}

	request, err := http.NewRequestWithContext(ctx, method, requestURL, nil)
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(rangeHeader) != "" {
		request.Header.Set("Range", strings.TrimSpace(rangeHeader))
	}
	c.sign(request, method, canonicalURI)

	return c.client.Do(request)
}

func (c *minioClient) objectURL(bucket string, objectKey string) (string, string, error) {
	bucket = strings.TrimSpace(bucket)
	objectKey = strings.Trim(strings.TrimSpace(objectKey), "/")
	if bucket == "" || objectKey == "" {
		return "", "", errors.New("bucket and object key are required")
	}

	scheme := "http"
	endpoint := c.endpoint
	if strings.HasPrefix(endpoint, "http://") || strings.HasPrefix(endpoint, "https://") {
		parsed, err := url.Parse(endpoint)
		if err != nil {
			return "", "", fmt.Errorf("parse minio endpoint: %w", err)
		}
		scheme = parsed.Scheme
		endpoint = parsed.Host
	} else if c.secure {
		scheme = "https"
	}

	canonicalURI := "/" + encodePathSegment(bucket) + "/" + encodeObjectKey(objectKey)
	return scheme + "://" + endpoint + canonicalURI, canonicalURI, nil
}

func (c *minioClient) sign(request *http.Request, method string, canonicalURI string) {
	c.signWithPayloadHash(request, method, canonicalURI, unsignedPayloadHash)
}

func (c *minioClient) signWithPayloadHash(request *http.Request, method string, canonicalURI string, payloadHash string) {
	now := c.now().UTC()
	amzDate := now.Format("20060102T150405Z")
	dateStamp := now.Format("20060102")
	region := "us-east-1"
	service := "s3"
	payloadHash = firstNonEmpty(payloadHash, unsignedPayloadHash)

	request.Header.Set("X-Amz-Date", amzDate)
	request.Header.Set("X-Amz-Content-Sha256", payloadHash)

	headers := map[string]string{
		"host":                 request.URL.Host,
		"x-amz-content-sha256": payloadHash,
		"x-amz-date":           amzDate,
	}
	if value := strings.TrimSpace(request.Header.Get("Range")); value != "" {
		headers["range"] = value
	}

	headerNames := make([]string, 0, len(headers))
	for name := range headers {
		headerNames = append(headerNames, name)
	}
	sort.Strings(headerNames)

	var canonicalHeaders bytes.Buffer
	for _, name := range headerNames {
		canonicalHeaders.WriteString(name)
		canonicalHeaders.WriteByte(':')
		canonicalHeaders.WriteString(strings.TrimSpace(headers[name]))
		canonicalHeaders.WriteByte('\n')
	}

	signedHeaders := strings.Join(headerNames, ";")
	canonicalRequest := strings.Join([]string{
		method,
		canonicalURI,
		"",
		canonicalHeaders.String(),
		signedHeaders,
		payloadHash,
	}, "\n")

	credentialScope := strings.Join([]string{dateStamp, region, service, "aws4_request"}, "/")
	stringToSign := strings.Join([]string{
		"AWS4-HMAC-SHA256",
		amzDate,
		credentialScope,
		sha256Hex([]byte(canonicalRequest)),
	}, "\n")

	signingKey := awsV4SigningKey(c.secretKey, dateStamp, region, service)
	signature := hex.EncodeToString(hmacSHA256(signingKey, stringToSign))
	authorization := fmt.Sprintf(
		"AWS4-HMAC-SHA256 Credential=%s/%s, SignedHeaders=%s, Signature=%s",
		c.accessKey,
		credentialScope,
		signedHeaders,
		signature,
	)
	request.Header.Set("Authorization", authorization)
}

func encodeObjectKey(objectKey string) string {
	parts := strings.Split(objectKey, "/")
	for index, part := range parts {
		parts[index] = encodePathSegment(part)
	}
	return strings.Join(parts, "/")
}

func encodePathSegment(value string) string {
	return strings.ReplaceAll(url.PathEscape(value), "+", "%20")
}

func sha256Hex(value []byte) string {
	sum := sha256.Sum256(value)
	return hex.EncodeToString(sum[:])
}

func sha256ReaderHex(reader io.Reader) (string, error) {
	hasher := sha256.New()
	if _, err := io.Copy(hasher, reader); err != nil {
		return "", err
	}
	return hex.EncodeToString(hasher.Sum(nil)), nil
}

func hmacSHA256(key []byte, value string) []byte {
	mac := hmac.New(sha256.New, key)
	mac.Write([]byte(value))
	return mac.Sum(nil)
}

func awsV4SigningKey(secret string, dateStamp string, region string, service string) []byte {
	dateKey := hmacSHA256([]byte("AWS4"+secret), dateStamp)
	dateRegionKey := hmacSHA256(dateKey, region)
	dateRegionServiceKey := hmacSHA256(dateRegionKey, service)
	return hmacSHA256(dateRegionServiceKey, "aws4_request")
}
