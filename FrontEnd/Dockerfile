#FROM node:12-alpine3.12 As builder
#WORKDIR /usr/src/app
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#RUN npm run build -- --prod

FROM nginx:1.15.8-alpine

# Comment next line if NOT using builder image
#COPY --from=builder /usr/src/app/dist/Frontend/ /usr/share/nginx/html

# Comment next line if using builder image
COPY ./dist/FrontEnd/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80