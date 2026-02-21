FROM oven/bun:1.3-alpine AS base

WORKDIR /usr/src/app

COPY package.json bun.lock ./

FROM base AS dev

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun","run","dev"]

FROM base AS production

ENV NODE_ENV=production

RUN bun install --frozen-lockfile --production

USER bun

COPY --chown=bun:bun ./src .

EXPOSE 3000/tcp 

CMD ["bun","run","start"]