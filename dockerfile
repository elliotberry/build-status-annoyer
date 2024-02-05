# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Install alsa-utils
RUN apt-get update && apt-get install -y alsa-utils

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy your Node.js application code to the container
COPY . .

# Expose port 9099 for the Node.js application
EXPOSE 9099

# Start the Node.js application
CMD [ "node", "index.js" ]
