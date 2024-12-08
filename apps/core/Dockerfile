FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY ../../.npmrc   ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as builder
ARG APP_NAME
WORKDIR /app
COPY package*.json .
COPY .npmrc .
RUN npm install
COPY . .
RUN npm run build core


FROM node:alpine As production
WORKDIR /app
ARG APP_NAME
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json .
COPY  apps/core/.production.env ./apps/core/.env
ENV APP_MAIN_FILE=dist/apps/core/src/main.js
CMD node ${APP_MAIN_FILE}
