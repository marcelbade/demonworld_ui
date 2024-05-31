FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

Copy . .

EXPOSE 3000

CMD [ "npm", "start" ]