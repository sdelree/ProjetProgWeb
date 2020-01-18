FROM node:lts

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT npm run start

EXPOSE 3000
