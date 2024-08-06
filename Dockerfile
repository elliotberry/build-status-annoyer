FROM node:22 AS build-env
COPY . /app
WORKDIR /app

RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build-env /app /app
WORKDIR /app
CMD ["index.js"]
EXPOSE 9099
VOLUME ["/logs", "/cache"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD pgrep node || exit​⬤