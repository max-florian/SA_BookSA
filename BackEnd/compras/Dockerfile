FROM node:14.17-alpine3.13

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]