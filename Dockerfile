FROM node:11-alpine

WORKDIR /home/node/app

# Install deps
COPY ./package* ./
RUN npm install && \
    npm cache clean --force

COPY . .

# Expose ports 
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
