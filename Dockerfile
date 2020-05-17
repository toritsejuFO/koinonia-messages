FROM node:12-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/path

COPY . .

RUN npm i

EXPOSE 3333

CMD ["npm", "start"]
