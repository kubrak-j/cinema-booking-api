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
COPY prune-prisma.sh ./prune-prisma.sh

RUN --mount=type=bind,from=builder,source=/usr/src/app/node_modules/.prisma,target=/tmp/.prisma \
    --mount=type=bind,from=builder,source=/usr/src/app/node_modules/@prisma/client,target=/tmp/prisma-client \
    npm ci --omit=dev \
    && sh ./prune-prisma.sh \
    && rm -f ./prune-prisma.sh \
    && rm -rf node_modules/.prisma node_modules/@prisma/client \
    && cp -a /tmp/.prisma node_modules/.prisma \
    && cp -a /tmp/prisma-client node_modules/@prisma/client \
    && npm cache clean --force \
    && rm -rf /root/.npm

FROM node:24.18.0-alpine AS runner

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=prod-deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist

USER node

EXPOSE 7000

CMD ["node", "dist/main.js"]
