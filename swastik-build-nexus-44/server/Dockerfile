# backend/Dockerfile
FROM node:20-slim

WORKDIR /app


# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get update && apt-get install -y openssh-client openssl && rm -rf /var/lib/apt/lists/*

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 5001

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
