ARG NODE_VERSION=18.13.0
ARG NPM_VERSION=9.1.2

FROM docker.io/node:${NODE_VERSION}

ARG NPM_VERSION
ENV NPM_VERSION ${NPM_VERSION}

RUN npm install --location=global npm@${NPM_VERSION}

WORKDIR /app

COPY package*.json /

RUN npm install

COPY . .

CMD ["npm", "run", "start"]