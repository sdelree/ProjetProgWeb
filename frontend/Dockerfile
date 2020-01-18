FROM node:lts-alpine AS builder

RUN mkdir /build

WORKDIR /build

COPY . .

RUN npm install

RUN node ./node_modules/@angular/cli/bin/ng build --prod

FROM nginx:latest

RUN mkdir /app

WORKDIR /app

COPY --from=builder /build/dist/wheretopark /app

COPY docker/nginx.template.conf /tmp/nginx.template.conf

CMD /bin/bash -c "envsubst < /tmp/nginx.template.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"

EXPOSE 80
