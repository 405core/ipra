#!/bin/sh
set -eu

CERT_DIR="/etc/nginx/certs"
CERT_FILE="${CERT_DIR}/server.crt"
KEY_FILE="${CERT_DIR}/server.key"

mkdir -p "${CERT_DIR}"

if [ -f "${CERT_FILE}" ] && [ -f "${KEY_FILE}" ]; then
  exit 0
fi

COMMON_NAME="${SSL_COMMON_NAME:-localhost}"
ALT_NAMES="${SSL_ALT_NAMES:-DNS:localhost,IP:127.0.0.1}"
DAYS="${SSL_CERT_DAYS:-3650}"

cat > /tmp/ipra-self-signed.cnf <<EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
x509_extensions = v3_req
distinguished_name = dn

[dn]
CN = ${COMMON_NAME}

[v3_req]
subjectAltName = ${ALT_NAMES}
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
EOF

openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout "${KEY_FILE}" \
  -out "${CERT_FILE}" \
  -days "${DAYS}" \
  -config /tmp/ipra-self-signed.cnf

chmod 600 "${KEY_FILE}"
