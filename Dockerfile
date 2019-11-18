FROM node:10-alpine

RUN mkdir -p usr/src/app
WORKDIR usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm install --no-progress --ignore-optional
RUN npm install webpack-dev-server -g
EXPOSE 80

CMD ["npm", "run", "start:dev"]

