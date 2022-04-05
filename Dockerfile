FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY index.js ./

RUN npm install --production

CMD npm start