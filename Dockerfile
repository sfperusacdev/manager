FROM node:16.20-alpine3.18 as builder1
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY . .
RUN npm run build

FROM node:16.20-alpine3.18 as builder2
WORKDIR /app
RUN apk update && apk add curl wget unzip
RUN wget https://github.com/pocketbase/pocketbase/archive/refs/tags/v0.17.3.zip -O '/tmp/pocketbase.zip'
RUN unzip /tmp/pocketbase.zip -d /tmp/pocketbase/
RUN cp -r /tmp/pocketbase/$(ls /tmp/pocketbase)/ui/* .
RUN npm install
COPY .env.production /tmp/
RUN  echo PB_BACKEND_URL=$(cat /tmp/.env.production | awk -F '=' '{print $2}')>.env
RUN  echo PB_VERSION = $(ls /tmp/pocketbase | awk -F '-' '{print $2}')>>.env
COPY logo.svg public/images/
RUN npm run build
RUN sed "s|http://127.0.0.1:\*|$(cat .env | grep PB_BACKEND_URL | head -n1 | awk -F '=' '{print $2}')|g" dist/index.html \
| sed "s|PocketBase|PB - SF|g" > temp_index 
RUN cat temp_index > dist/index.html 

FROM nginx:stable-alpine3.17
RUN mkdir /usr/share/nginx/web_site
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
COPY --from=builder1 /app/dist/ /usr/share/nginx/web_site/
COPY --from=builder2 /app/dist/ /usr/share/nginx/pb/
