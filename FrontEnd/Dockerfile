FROM node:12-alpine3.12 As builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=builder /app/dist/FrontEnd/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY ./script.sh /usr/share/nginx/html/script.sh

EXPOSE 80

ENTRYPOINT sh /usr/share/nginx/html/script.sh
