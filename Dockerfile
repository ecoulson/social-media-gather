#Dockerfile
# PROD CONFIG
FROM node:lts-alpine
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG NODE_ENV
ARG PORT=5000

ENV NODE_ENV=${NODE_ENV}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

WORKDIR /usr/server

COPY server/package*.json ./
# need to configure aws creds
RUN npm install

COPY server/ .

CMD [ "npm", "start", "${PORT}" ]