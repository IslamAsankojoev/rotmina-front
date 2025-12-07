FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

FROM node:18-alpine AS builder
WORKDIR /app

ARG API_INTERNAL_URL
ARG API_PAY_SERVICE

ENV API_INTERNAL_URL=${API_INTERNAL_URL}
ENV API_PAY_SERVICE=${API_PAY_SERVICE}
ENV NODE_ENV=production

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -S app && adduser -S app -G app

COPY package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules

RUN chown -R app:app /app && npm prune --omit=dev
USER app

EXPOSE 3000

CMD ["npm", "run", "start"]
