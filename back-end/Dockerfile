# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json /usr/src/app/

# Install dependencies
RUN npm install


# Copy the rest of the application code to the working directory
COPY . /usr/src/app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]
