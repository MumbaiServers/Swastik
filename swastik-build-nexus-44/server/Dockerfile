FROM node:20-slim

WORKDIR /app

# Install dependencies required for Prisma + DB wait
RUN apt-get update && apt-get install -y \
    openssl \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install node modules
RUN npm ci

# Copy app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build app
RUN npm run build

EXPOSE 5001

CMD sh -c "\
echo 'Waiting for database...' && \
until nc -z swastik-database.cbu46wyi4srg.ap-south-1.rds.amazonaws.com 3306; do \
  sleep 2; \
done && \
echo 'Database connected' && \
npx prisma migrate deploy && \
npm start"
