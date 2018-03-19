FROM node:alpine

MAINTAINER xxoo

ENV DOCPATH ../doc/swagger.yaml
ENV PORT 8888

EXPOSE $PORT

ADD package.json /tmp/package.json

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cd /tmp && cnpm install
RUN mkdir -p /run/mock_server && cp -a /tmp/node_modules /run/mock_server

RUN cnpm install -g swagger@0.7.5

WORKDIR /run/mock_server

ADD . /run/mock_server
RUN cp swagger-router.js node_modules/swagger-tools/middleware/swagger-router.js


CMD ["/bin/sh", "-c",  "DOCPATH=$DOCPATH PORT=$PORT npm run docker_server"]


