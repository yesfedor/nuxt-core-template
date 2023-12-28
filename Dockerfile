FROM alpine:latest

ARG ENVIRONMENT_NAME
ARG BRANCH_NAME
ENV BRANCH_NAME=${BRANCH_NAME}

WORKDIR /home/project

RUN apk update && apk add --no-cache git

RUN /bin/sh -c "git clone --single-branch --branch $BRANCH_NAME https://github.com/yesfedor/nuxt-core-template.git ."

RUN git checkout

RUN git pull

FROM node:18.16.1

COPY ./environments/${ENVIRONMENT_NAME}.env .env

RUN npm ci

RUN npm run build

ENV PORT 3000

EXPOSE $PORT

CMD ["node", ".output/server/index.mjs"]
