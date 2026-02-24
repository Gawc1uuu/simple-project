FROM oven/bun:1.3-alpine AS base

WORKDIR /usr/src/frontend

COPY package.json bun.lock ./

FROM base AS dev

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun","run","dev"]

FROM base AS builder

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM base AS production

ENV NODE_ENV=production

USER bun

COPY --from=builder /usr/src/frontend/.next/standalone ./
COPY --from=builder /usr/src/frontend/.next/static ./.next/static
COPY --from=builder /usr/src/frontend/public ./public

COPY --chown=bun:bun package.json ./

EXPOSE 4000/tcp 

CMD ["bun","run","server.js"]