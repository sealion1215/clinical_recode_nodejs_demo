FROM node:14.17-alpine3.13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node
COPY . .
RUN npm run build

ENV PORT=8081 \
    DB_HOST=172.17.0.2 \
    DB_PORT=3306 \
    DB_USER=clinic_admin \
    DB_PASSWORD=clinic \
    TOKEN_SECRET=secret \
    TOKEN_EXPIRE_TIME=3600

EXPOSE 8081
CMD ["npm", "run", "start"]
