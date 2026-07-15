# syntax=docker/dockerfile:1

FROM node:24.18.0-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

COPY prisma.config.ts .

COPY tsconfig.json .

COPY src ./src

COPY --chmod=755 docker-entrypoint.sh .

RUN chown -R node:node /usr/src/app

EXPOSE 7000

CMD ["./docker-entrypoint.sh"]
