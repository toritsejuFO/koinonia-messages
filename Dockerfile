FROM node:12-alpine

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3333

CMD ["npm", "start"]
