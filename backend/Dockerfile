# Use an official Node.js runtime as a parent image.
# Using alpine for a smaller image size.
FROM node:18-alpine

# Set the working directory in the container.
WORKDIR /app/backend

# Copy package.json and package-lock.json first.
# This leverages Docker's caching. `npm install` will only run again
# if these files change.
COPY package.json package-lock.json* ./

# Install project dependencies.
# `npm ci` is generally recommended for production builds as it's faster
# and uses the package-lock.json for deterministic installs.
RUN npm ci

# Copy the rest of the application's source code from the host to the container.
COPY . .

# The backend application listens on port 5000.
EXPOSE 5177

# The command to run the application.
# `node app.js` is used for production instead of `nodemon`.
CMD ["node", "app.js"]