### How to containerize project using Docker

* For this process you must have Docker installed, same as for node, this is different on every operating system so I will just leave [official link to docker website](https://www.docker.com/community-edition) that has how-to. 
* When Docker is installed, we must also install docker-compose. If you are using Docker for Windows you can ignore this part, as docker-compose is bundled with it. Here is [official docker-compose download page](https://docs.docker.com/compose/install/).
You can verify that Docker and docker-compose are installed by running following commands:
```bash
docker --version
docker-compose --version
```
> Most of GNU/Linux distributions have docker and docker-compose in their package managers, but they are outdated so manual installation is preferred.

Once we have both docker and docker-compose installed we can clone repository :
```bash
git clone https://bitbucket.org/brandtsolutions/threejs-server.git && cd threejs-server
```
You will find 3 files related to docker there :
* Dockerfile - this file will define what goes on in the environment inside container. I've carefully commented every line in it so you can easily see what is happening there. Basically we are doing in it :
    * using node:9-stretch image as base (Official Node docker image based on Debian Stretch) 
    * copying all project files to it 
    * installing additional GL dependencies 
    * faking init system(so we can setup fake screen that must run in order to use WebGL renderer) 
    * faking display screen with resolution of 1280x1024
    * installing node modules
    * exposing(opening) port 8080 from container to host
    * running our project using npm start
* docker-compose.yml - YAML file that defines how Docker containers should behave in production, it allows us to make api/public directory (directory where all rendered images are saved) persistent so we can have all our data saved even if container is restared. What is important in it :
    * build: . - this tells it to use local Dockerfile to build image
    * ports: - this maps container port 8080 to host port 8080
    * environment: - this will set environment variables we are using in project (see below for more details)
    * volumes: - this will create volume threejsData if it does not already exist and map it to /app/api/public in container
* .dockerignore - Similar to .gitignore this tells docker what files to ignore when building image

### Customizing docker-compose.yml file
You can change/add following environment variables in this file :
  * NODE_ENV=production (If environment is test api wont log any requests) 
  * IP_ADDR=x.x.x.x (Change this to your IP address - this is used for swagger docs)
  * PORT=8080 (Change this if you dont want to run on port 8080)
  * URL=http://x.x.x.x (This will be host in api path response, should be same as IP_ADDR)
> If you change PORT environment variable, you should change "8080:8080" in ports property as well

### Building and starting container
You can build and start container simply by writing :
```bash
docker-compose up -d
```
This will build image if its not already built and start container (will use docker-compose.yml), option -d is simply telling to detach from container(run container in background).
You can verify container is running with :
```bash
docker container ps
```
> Web API will be by default running on http://<your-ip-address>:8080 , Docs are available at : http://<your-ip-address>:8080/docs , unless you changed port
