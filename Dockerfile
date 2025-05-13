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

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "host"]