# ------------------------
# Dockerfile for Express Backend
# ------------------------
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the entire backend source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
