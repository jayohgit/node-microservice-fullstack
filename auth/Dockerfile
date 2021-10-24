FROM node:12.10.0-alpine

WORKDIR /usr/app/auth

COPY package*.json ./
RUN npm ci -qy

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
