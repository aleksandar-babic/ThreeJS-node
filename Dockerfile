FROM ubuntu:16.04

# Create app directory on container, copy all project files
WORKDIR /app
COPY . .

# Install dependencies needed in order to build all node modules
RUN apt-get update
RUN apt-get install -y libcairo2-dev libjpeg-dev libgif-dev libxi-dev build-essential mesa-common-dev curl
# Install NodeJS 9.x
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs

# Install all project dependencies
RUN npm install

# Open port 8080
EXPOSE 8080
# Start Web API
CMD ["npm", "start"]