# Use node v10.8.0

FROM node:10.8.0

# Copy source code
COPY . /server

# Change working directory
WORKDIR /server

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 8080

# Launch application
CMD ["npm","run", "start"]