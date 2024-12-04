FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY ../../.npmrc   ./

RUN npm install

COPY . .

RUN npm run start:dev

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY ../../.npmrc   ./

RUN npm install --only=production

COPY . .

COPY --from=production /usr/src/app/dist ./dist

CMD ["node", "dist/apps/core/main"]