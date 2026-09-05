# syntax=docker/dockerfile:1

FROM node:24.18.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY prisma.config.ts .
COPY tsconfig.json .
COPY src ./src

RUN npm run build

FROM node:24.18.0-alpine AS runner

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node prisma ./prisma
COPY --chown=node:node prisma.config.ts .

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY --chown=node:node --chmod=755 docker-entrypoint.sh ./docker-entrypoint.sh

USER node

EXPOSE 7000

CMD ["./docker-entrypoint.sh"]
