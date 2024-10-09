# Use Node.js LTS version
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code
COPY . .

# Ensure the `next` command is available
RUN npm install next

# Expose the port that Next.js runs on
EXPOSE 3000

# Command to start Next.js in development mode
CMD ["npm", "run", "dev"]
