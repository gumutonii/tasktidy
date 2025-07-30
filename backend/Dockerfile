FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Environment variables (can be overridden in docker-compose)
ENV PORT=5000
ENV MONGO_URI=mongodb://mongo:27017/tasktidy
ENV NODE_ENV=production

EXPOSE 5000
CMD ["npm", "start"] 