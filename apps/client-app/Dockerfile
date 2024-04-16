# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /client-app/
COPY public/ ./public
COPY src/ ./src
COPY package.json ./
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000