FROM node:14-slim
WORKDIR /home/node/api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD [ "npm", "start" ]