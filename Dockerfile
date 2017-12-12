# Use Debian Stretch with NodeJS 9 preinstalled as base
FROM node:9-stretch

# Create app directory on container, copy all project files
WORKDIR /app
COPY . .

# Install dependencies needed in order to build all node modules and run OpenGL
RUN apt-get update
RUN apt-get install -y \
        libcairo2-dev \
        libjpeg-dev \
        libgif-dev \
        libxi-dev \
        build-essential \
        mesa-common-dev \
        curl \
        libgl1-mesa-dri \
        libglapi-mesa \
        libosmesa6 \
        mesa-utils \
        xvfb \
    && apt-get clean

# Download fake init system
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64 /usr/bin/dumb-init

# Setup permissions for it
RUN chmod 0777 /usr/bin/dumb-init

# Initialize fake screen
ENTRYPOINT ["/usr/bin/dumb-init", "--", "xvfb-run", "-s", "-ac -screen 0 1280x1024x24"]

# Install all project dependencies
RUN npm install

# Open port 8080
EXPOSE 8080

# Start Web API
CMD ["npm", "start"]