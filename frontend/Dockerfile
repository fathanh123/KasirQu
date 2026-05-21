# --- 1. Build Stage ---
# This stage builds the React app.
FROM node:18-alpine AS builder

# Set the working directory for the build.
WORKDIR /app/frontend

# Copy package.json and package-lock.json to leverage Docker cache.
COPY package.json package-lock.json* ./

# Install dependencies.
RUN npm ci

# Copy the rest of the frontend source code.
COPY . .

# Build the application for production.
# This creates a `dist` folder with static assets.
RUN npm run build

# --- 2. Serve Stage ---
# This stage serves the built static files using Nginx.
FROM nginx:stable-alpine

# Copy the custom Nginx configuration.
# This is important for single-page applications (SPAs) to handle routing correctly.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built static files from the 'builder' stage.
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Expose port 80 for Nginx.
EXPOSE 80

# The default command for the nginx image is to start the server.
CMD ["nginx", "-g", "daemon off;"]