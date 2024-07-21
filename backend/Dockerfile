FROM node:14

WORKDIR /app

EXPOSE 3001

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]
