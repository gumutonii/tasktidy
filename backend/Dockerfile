# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Run the app in development mode
CMD ["npm", "run", "dev"]
