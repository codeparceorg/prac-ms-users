FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY dist ./dist

LABEL org.opencontainers.image.source https://github.com/codeparceorg/ms-nestjs-users

CMD ["npm", "run", "start:prod"]
