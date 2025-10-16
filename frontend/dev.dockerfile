FROM node:20.13.1-alpine

ENV TZ=UTC

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
