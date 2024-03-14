FROM node:16-alpine3.14 AS builder

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm i 

RUN apk --update --no-cache add curl
COPY src src
# COPY public public
# COPY codegen.ts .

COPY tsconfig.json .

RUN npm run build

FROM node:16-alpine3.14

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install --production

COPY --from=builder /app/dist dist

CMD npm run startjs