FROM alpine AS builder
RUN apk add --update yarn
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install --production

COPY ./src /app/src
COPY ./public /app/public
COPY .env /app/.env
RUN yarn build

FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]