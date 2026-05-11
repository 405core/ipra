FROM node:22-alpine AS build

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY apps/frontend ./apps/frontend

RUN pnpm install --frozen-lockfile

ARG VITE_AI_SERVICE_BASE_URL=/ai
ENV VITE_AI_SERVICE_BASE_URL=${VITE_AI_SERVICE_BASE_URL}

RUN pnpm exec vite build --config apps/frontend/vite.config.mts

FROM nginx:1.27-alpine

RUN apk add --no-cache openssl

COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/frontend/docker-entrypoint.d/40-generate-self-signed-cert.sh /docker-entrypoint.d/40-generate-self-signed-cert.sh
RUN chmod +x /docker-entrypoint.d/40-generate-self-signed-cert.sh
COPY --from=build /app/dist/apps/frontend /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
