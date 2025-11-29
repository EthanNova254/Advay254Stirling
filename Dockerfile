# ===== Stirling-PDF Lightweight Dockerfile =====

# 1. Base image: small Alpine with Node 20
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install stable npm version
RUN npm install -g npm@11.6.4

# 4. Copy package.json & package-lock.json (only what’s needed)
COPY package*.json ./

# 5. Install production dependencies with better logging and peer dep handling
RUN npm install --production --legacy-peer-deps || cat /root/.npm/_logs/*-debug-*.log

# 6. Copy the rest of your app
COPY . .

# 7. Clean npm cache to reduce image size
RUN npm cache clean --force

# 8. Expose port (Render automatically injects PORT env)
ENV PORT=8080
EXPOSE 8080

# 9. Start the server
CMD ["node", "server.js"]
