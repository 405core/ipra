#!/usr/bin/env bash

set -euo pipefail

if ! command -v openssl >/dev/null 2>&1; then
  echo "缺少 openssl，无法生成本地 HTTPS 证书。" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CERT_DIR="${ROOT_DIR}/.certs"
KEY_PATH="${CERT_DIR}/ipra-local-key.pem"
CERT_PATH="${CERT_DIR}/ipra-local-cert.pem"
CONFIG_PATH="${CERT_DIR}/openssl-ipra-local.cnf"

mkdir -p "${CERT_DIR}"

EXTRA_SANS=("$@")
SAN_ENTRIES=(
  "DNS.1 = localhost"
  "DNS.2 = $(hostname)"
  "IP.1 = 127.0.0.1"
)

dns_index=3
ip_index=2

for san in "${EXTRA_SANS[@]}"; do
  if [[ "${san}" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    SAN_ENTRIES+=("IP.${ip_index} = ${san}")
    ip_index=$((ip_index + 1))
  else
    SAN_ENTRIES+=("DNS.${dns_index} = ${san}")
    dns_index=$((dns_index + 1))
  fi
done

cat >"${CONFIG_PATH}" <<EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
x509_extensions = v3_req
distinguished_name = req_distinguished_name

[req_distinguished_name]
C = CN
ST = Local
L = Local
O = IPRA
OU = Development
CN = localhost

[v3_req]
subjectAltName = @alt_names
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth

[alt_names]
$(printf '%s\n' "${SAN_ENTRIES[@]}")
EOF

openssl req \
  -x509 \
  -nodes \
  -days 3650 \
  -newkey rsa:2048 \
  -keyout "${KEY_PATH}" \
  -out "${CERT_PATH}" \
  -config "${CONFIG_PATH}"

echo "已生成本地 HTTPS 证书："
echo "  key:  ${KEY_PATH}"
echo "  cert: ${CERT_PATH}"
echo
echo "启动方式："
echo "  npm run dev:frontend:https"
echo "  npm run dev:https"
if [[ ${#EXTRA_SANS[@]} -gt 0 ]]; then
  echo
  echo "附加 SAN：${EXTRA_SANS[*]}"
fi
