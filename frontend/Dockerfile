FROM node:18-alpine

WORKDIR /opt/hoboc

COPY src/package*.json ./src/

RUN cd src && npm install

COPY src .

CMD ["npm", "--prefix", "src", "run", "dev"]
