# backend/Dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN apt-get update && apt-get install -y openssh-client openssl && rm -rf /var/lib/apt/lists/*
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]
