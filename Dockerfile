# Use the official lightweight Node.js 18 image based on Alpine Linux
FROM node:20-alpine

# Install additional dependencies if necessary
RUN apk add --no-cache \
    bash \
    git

# Set the working directory
WORKDIR /workspace

# Copy the rest of your application code
COPY . .

RUN git submodule update --init --recursive --remote


RUN npm install

# Expose the port the app runs on
EXPOSE 12050
