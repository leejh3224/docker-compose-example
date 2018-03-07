FROM mhart/alpine-node:9.7.1

RUN mkdir -p /usr/src/app

RUN npm install -g nodemon

ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 3030

CMD ["yarn", "start"]