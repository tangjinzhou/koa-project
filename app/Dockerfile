FROM registry.docker-cn.com/library/node:8.4.0
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install -g pm2

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

WORKDIR /src
ADD . /src

EXPOSE  3000

CMD pm2 start server/www.js
# CMD npm run dev
