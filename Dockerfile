FROM node:18.16.1
FROM alpine:latest

ARG ENVIRONMENT_NAME

WORKDIR /home/project

COPY ./package*.json ./

COPY . .

COPY ./environments/${ENVIRONMENT_NAME}.env .env

RUN apk update && apk add --no-cache git

RUN git pull

RUN npm ci

RUN npm run build

ENV PORT 3000

EXPOSE $PORT

CMD ["node", ".output/server/index.mjs"]
