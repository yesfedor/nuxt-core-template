FROM alpine:latest AS prepare-stage

ARG ENVIRONMENT_NAME
ARG BRANCH_NAME
ENV BRANCH_NAME=${BRANCH_NAME}

WORKDIR /home/project

RUN apk update && apk add --no-cache git

RUN /bin/sh -c "git clone --single-branch --branch $BRANCH_NAME https://github.com/yesfedor/nuxt-core-template.git ."

RUN ls -la /home/project/

FROM node:18.16.1
ARG ENVIRONMENT_NAME

COPY --from=prepare-stage /home/project /home/project

RUN ls -la /home/project/

WORKDIR /home/project

RUN /bin/sh -c "cp ./environments/${ENVIRONMENT_NAME}.env .env"

RUN npm ci

RUN npm run build

RUN ls -la /home/project/

CMD ["node", ".output/server/index.mjs"]
