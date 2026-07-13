# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

# NODE.JS VERSION CONFIGURATION
ARG NODE_VERSION=26.4.0

# Use the official Node.js base image.
FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

# Set the working directory inside the container to store all our API files.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from your host machine to the container.
COPY package*.json ./

# Download dependencies
RUN npm ci

# Copy the rest of the source files into the image.
COPY . .

# Generate Prisma client files based on the schema (prisma/schema.prisma).
RUN npx prisma generate

# Copy and make entrypoint executable
COPY docker-entrypoint.sh .

# Grant execution permissions to the script file within the container's Linux system.
RUN chmod +x docker-entrypoint.sh

# Change the permissions of all files in the working directory from user 'root' to the secure user 'node'.
RUN chown -R node:node /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE ${PORT}

# Main entrypoint. When starting the container, Docker executes docker-entrypoint.sh first.
ENTRYPOINT ["./docker-entrypoint.sh"]
