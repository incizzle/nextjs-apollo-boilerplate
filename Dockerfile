FROM node:latest
WORKDIR /usr/src/src
COPY ./ .
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]