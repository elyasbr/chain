FROM node:20-alpine as builder
ARG APP_NAME
WORKDIR /app
COPY package*.json .
COPY .npmrc .
RUN npm install
COPY . .
RUN npm run build core


FROM node:alpine As development
WORKDIR /app
ARG APP_NAME
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json .
COPY  /apps/core/.env /app/dist
ENV APP_MAIN_FILE=dist/apps/core/src/main.js
CMD node ${APP_MAIN_FILE}



FROM node:20-alpine as prod
WORKDIR /app
ARG APP_NAME
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json .
COPY  /apps/core/.production.env /app/dist/.env
ENV APP_MAIN_FILE=dist/apps/core/src/main.js
CMD node ${APP_MAIN_FILE}

