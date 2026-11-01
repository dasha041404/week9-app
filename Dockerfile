FROM node:18-slim

RUN apt-get update && apt-get install -y \
    wget gnupg ca-certificates procps libxss1 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "index.js"]