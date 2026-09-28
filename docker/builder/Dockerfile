FROM node:22-bookworm

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.14.4 --activate

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter=./packages/prisma-client build

RUN pnpm --filter=@webstudio-is/builder build

ENV NODE_ENV=production
ENV PORT=5173

EXPOSE 5173

CMD ["node", "/app/apps/builder/build/server/nodejs-eyJydW50aW1lIjoibm9kZWpzIn0/index.js"]
