FROM node:18 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

FROM node:18 AS builder
# Добавляем возможность передавать переменную окружения BACKEND_API_URL
ARG BACKEND_API_URL
ENV BACKEND_API_URL=${BACKEND_API_URL}
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
# Выводим значение BACKEND_API_URL для проверки
RUN echo "BACKEND_API_URL: ${BACKEND_API_URL}"
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
