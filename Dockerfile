# Step 1: Use official Node.js image for building React
FROM node:18-alpine 

WORKDIR /app

# Step 2: Copy package.json and install dependencies
COPY package*.json ./

RUN npm ci

# Step 3: Copy all the frontend files
COPY . .

# Step 4: Build the React app for production
# RUN npm run build

# Step 5: Use Nginx to serve the static files
# FROM nginx:alpine

# Copy the build files into the Nginx container
# COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on
# EXPOSE 80

# Step 6: Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "host"]