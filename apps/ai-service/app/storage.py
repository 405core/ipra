from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import os
from pathlib import Path
from urllib.parse import quote

from minio import Minio

from config import is_truthy


@dataclass(frozen=True)
class MinioSettings:
    endpoint: str
    access_key: str
    secret_key: str
    bucket: str
    secure: bool
    public_base_url: str


@dataclass(frozen=True)
class StoredObject:
    stored_path: str
    bucket: str
    object_key: str


def load_minio_settings() -> MinioSettings | None:
    endpoint = os.getenv("MINIO_ENDPOINT", "").strip()
    access_key = os.getenv("MINIO_ACCESS_KEY", "").strip() or os.getenv("MINIO_ROOT_USER", "").strip()
    secret_key = os.getenv("MINIO_SECRET_KEY", "").strip() or os.getenv("MINIO_ROOT_PASSWORD", "").strip()
    bucket = os.getenv("MINIO_BUCKET_VIDEO", "").strip() or os.getenv("MINIO_BUCKET", "").strip()

    if not endpoint or not access_key or not secret_key or not bucket:
        return None

    public_base_url = os.getenv("MINIO_PUBLIC_BASE_URL", "").strip().rstrip("/")

    return MinioSettings(
        endpoint=endpoint,
        access_key=access_key,
        secret_key=secret_key,
        bucket=bucket,
        secure=is_truthy(os.getenv("MINIO_SECURE")),
        public_base_url=public_base_url,
    )


def is_minio_enabled() -> bool:
    return load_minio_settings() is not None


@lru_cache(maxsize=1)
def get_minio_client() -> Minio | None:
    settings = load_minio_settings()
    if settings is None:
        return None

    return Minio(
        settings.endpoint,
        access_key=settings.access_key,
        secret_key=settings.secret_key,
        secure=settings.secure,
    )


def store_file(local_path: Path, object_name: str, content_type: str | None = None) -> StoredObject:
    settings = load_minio_settings()
    client = get_minio_client()
    if settings is None or client is None:
        return StoredObject(stored_path=str(local_path), bucket="", object_key="")

    if not client.bucket_exists(settings.bucket):
        client.make_bucket(settings.bucket)

    client.fput_object(
        settings.bucket,
        object_name,
        str(local_path),
        content_type=content_type or "application/octet-stream",
    )

    if settings.public_base_url:
        encoded_key = "/".join(quote(part) for part in object_name.split("/"))
        stored_path = f"{settings.public_base_url}/{settings.bucket}/{encoded_key}"
    else:
        stored_path = f"minio://{settings.bucket}/{object_name}"

    return StoredObject(
        stored_path=stored_path,
        bucket=settings.bucket,
        object_key=object_name,
    )
