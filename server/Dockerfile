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

FROM node:24.18.0-alpine AS runner

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY prisma ./prisma

COPY prisma.config.ts .

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

COPY --chmod=755 docker-entrypoint.sh ./docker-entrypoint.sh

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 7000

CMD ["./docker-entrypoint.sh"]
