# Use the latest official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Bundle the application source inside the Docker image
COPY . .

# Expose port 3002 for the application
EXPOSE 3002

# Define the command to run the application
CMD [ "node", "src/server.js" ]