FROM node:latest as base

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]