FROM node:18 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

FROM node:18 AS builder
# Добавляем возможность передавать переменную окружения BACKEND_API_URL
ARG API_INTERNAL_URL
ARG API_PAY_SERVICE
ENV API_INTERNAL_URL=${API_INTERNAL_URL}
ENV API_PAY_SERVICE=${API_PAY_SERVICE}
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
# Выводим значение API_INTERNAL_URL для проверки
RUN echo "API_INTERNAL_URL: ${API_INTERNAL_URL}"
RUN echo "API_PAY_SERVICE: ${API_PAY_SERVICE}"
RUN npm run build

FROM node:18 AS runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT=3000
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD npm run start