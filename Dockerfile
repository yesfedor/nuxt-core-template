FROM node:18.16.1

ARG ENVIRONMENT_NAME

RUN apk update && apk upgrade

RUN apk add git

WORKDIR /home/project

COPY ./package*.json ./

COPY . .

COPY ./environments/${ENVIRONMENT_NAME}.env .env

RUN git pull

RUN npm ci

RUN npm run build

ENV PORT 3000

EXPOSE $PORT

CMD ["node", ".output/server/index.mjs"]
