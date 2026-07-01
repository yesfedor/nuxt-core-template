# syntax=docker/dockerfile:1.9
# Environment-agnostic image: contour config is injected at runtime (compose
# env_file), which is what allows promoting the same tag stage -> prod.

ARG NODE_VERSION=24.18.0

# deps
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# build
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN cp environments/build.env .env && npm run build

# runtime
FROM node:${NODE_VERSION}-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NITRO_PORT=3000
COPY --from=build /app/.output ./.output
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1
CMD ["node", ".output/server/index.mjs"]
