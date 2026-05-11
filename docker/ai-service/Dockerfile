FROM python:3.12-slim

ARG APT_MIRROR=mirrors.aliyun.com
ARG PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
ARG PIP_EXTRA_INDEX_URL=https://download.pytorch.org/whl/cu128

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_INDEX_URL=${PIP_INDEX_URL} \
    PIP_EXTRA_INDEX_URL=${PIP_EXTRA_INDEX_URL} \
    PIP_DEFAULT_TIMEOUT=120

WORKDIR /app

RUN if [ -f /etc/apt/sources.list.d/debian.sources ]; then \
      sed -i "s|deb.debian.org|${APT_MIRROR}|g; s|security.debian.org|${APT_MIRROR}|g" /etc/apt/sources.list.d/debian.sources; \
    fi && \
    apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg libgl1 libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*

COPY apps/ai-service/requirements.txt /app/apps/ai-service/requirements.txt

RUN python -m pip install --upgrade pip && \
    python -m pip install -r /app/apps/ai-service/requirements.txt

COPY apps/ai-service/app /app/apps/ai-service/app
COPY apps/ai-service/scripts /app/apps/ai-service/scripts
COPY apps/ai-service/vendor /app/apps/ai-service/vendor

EXPOSE 9000

CMD ["python", "-m", "uvicorn", "service:app", "--app-dir", "/app/apps/ai-service/app", "--host", "0.0.0.0", "--port", "9000"]
