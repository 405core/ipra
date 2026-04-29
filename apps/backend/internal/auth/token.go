package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"
)

var ErrInvalidToken = errors.New("invalid token")

type Claims struct {
	UserID    uint   `json:"sub"`
	WorkID    string `json:"workId"`
	Name      string `json:"name"`
	Role      string `json:"role"`
	ExpiresAt int64  `json:"exp"`
}

type TokenManager struct {
	secret []byte
	ttl    time.Duration
}

type tokenHeader struct {
	Algorithm string `json:"alg"`
	Type      string `json:"typ"`
}

func NewTokenManager(secret string, ttl time.Duration) *TokenManager {
	return &TokenManager{
		secret: []byte(secret),
		ttl:    ttl,
	}
}

func (m *TokenManager) Sign(user User) (string, error) {
	header := tokenHeader{
		Algorithm: "HS256",
		Type:      "JWT",
	}
	claims := Claims{
		UserID:    user.ID,
		WorkID:    user.WorkID,
		Name:      user.Name,
		Role:      user.Role,
		ExpiresAt: time.Now().Add(m.ttl).Unix(),
	}

	headerSegment, err := marshalTokenSegment(header)
	if err != nil {
		return "", err
	}
	payloadSegment, err := marshalTokenSegment(claims)
	if err != nil {
		return "", err
	}

	unsignedToken := headerSegment + "." + payloadSegment
	signature := m.sign(unsignedToken)

	return unsignedToken + "." + signature, nil
}

func (m *TokenManager) Parse(token string) (Claims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return Claims{}, ErrInvalidToken
	}

	unsignedToken := parts[0] + "." + parts[1]
	expectedSignature := m.sign(unsignedToken)
	if subtle.ConstantTimeCompare([]byte(parts[2]), []byte(expectedSignature)) != 1 {
		return Claims{}, ErrInvalidToken
	}

	var claims Claims
	if err := unmarshalTokenSegment(parts[1], &claims); err != nil {
		return Claims{}, ErrInvalidToken
	}
	if claims.ExpiresAt <= time.Now().Unix() {
		return Claims{}, ErrInvalidToken
	}

	return claims, nil
}

func (m *TokenManager) sign(unsignedToken string) string {
	mac := hmac.New(sha256.New, m.secret)
	mac.Write([]byte(unsignedToken))

	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

func marshalTokenSegment(value any) (string, error) {
	payload, err := json.Marshal(value)
	if err != nil {
		return "", fmt.Errorf("marshal token segment: %w", err)
	}

	return base64.RawURLEncoding.EncodeToString(payload), nil
}

func unmarshalTokenSegment(segment string, target any) error {
	payload, err := base64.RawURLEncoding.DecodeString(segment)
	if err != nil {
		return err
	}

	return json.Unmarshal(payload, target)
}
