#Dockerfile
# PROD CONFIG
FROM nikolaik/python-nodejs:latest

WORKDIR /usr/server

COPY server/package*.json ./

RUN npm install

COPY server/ .

EXPOSE 8080

CMD [ "npm", "start" ]