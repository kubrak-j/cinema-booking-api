# syntax=docker/dockerfile:1

FROM node:24.18.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts .
COPY tsconfig.json .
COPY src ./src

RUN npm run build

FROM node:24.18.0-alpine AS migrator

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/prisma.config.ts .
COPY --from=builder /usr/src/app/package*.json ./

CMD ["npx", "prisma", "migrate", "deploy"]

FROM node:24.18.0-alpine AS prod-deps

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev --omit=peer && npm cache clean --force

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

FROM node:24.18.0-alpine AS runner

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=prod-deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist
COPY --chown=node:node --chmod=755 docker-entrypoint.sh ./docker-entrypoint.sh

USER node

EXPOSE 7000

CMD ["./docker-entrypoint.sh"]
