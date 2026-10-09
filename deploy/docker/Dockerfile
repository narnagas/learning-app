FROM node:24-alpine AS build
WORKDIR /app
ENV NG_CLI_ANALYTICS=false
COPY apps/learning-app/package*.json ./
RUN npm ci
COPY apps/learning-app/ ./
RUN npm run build

FROM nginx:stable-alpine AS runtime
COPY deploy/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/learning-app/browser/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/health || exit 1
