FROM golang:1.25-alpine AS build

ARG GOPROXY=https://goproxy.cn,direct
ARG GOSUMDB=sum.golang.google.cn

ENV GOPROXY=${GOPROXY} \
    GOSUMDB=${GOSUMDB}

WORKDIR /src/apps/backend

COPY apps/backend/go.mod apps/backend/go.sum ./
RUN go mod download

COPY apps/backend ./
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /out/ipra-backend main.go

FROM alpine:3.22

RUN apk add --no-cache ca-certificates tzdata wget fontconfig font-wqy-zenhei

COPY --from=build /out/ipra-backend /usr/local/bin/ipra-backend

EXPOSE 8080

CMD ["ipra-backend"]
