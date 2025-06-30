FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY jest.config.js ./
COPY src ./src
COPY tests ./tests

EXPOSE 4000

CMD ["npm", "run", "dev"]
