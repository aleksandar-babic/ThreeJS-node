FROM ubuntu:16.04

WORKDIR /app
COPY . .

RUN apt-get update
RUN apt-get install -y libcairo2-dev libjpeg-dev libgif-dev libxi-dev build-essential mesa-common-dev curl
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs

RUN npm install

EXPOSE 8080
CMD ["npm", "start"]