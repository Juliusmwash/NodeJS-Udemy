#FROM node:lts-alpine3.23
#WORKDIR /app
# COPY . .
# RUN npm install --only=production
# RUN npm run build --prefix client
# USER node
# CMD [ "npm", "start", "--prefix", "server"]
# EXPOSE 8000


# CHANGED TO THE FOLLOWING TO UTILISE NPM WORKSPACES


# Use the official Node.js LTS image
FROM node:lts-alpine3.23

# Set the working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install --omit=dev

# Build the frontend
RUN npm run build --workspace=client

# Run as a non-root user
USER node

# Application listens on port 8000
EXPOSE 8000

# Start the backend
CMD ["npm", "start"]
