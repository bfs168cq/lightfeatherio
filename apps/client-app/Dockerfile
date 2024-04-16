# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /client-app/
COPY public/ /client-app/public
COPY src/ /client-app/src
COPY package.json /client-app/
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000