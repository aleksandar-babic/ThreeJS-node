## How to run Docker containerized project on remote server(Linux based)
### There are 3 options:
* Option 1 : use steps from docker.md but instead of running it on your local machine execute them on server (using SSH).
* Option 2 : deploy image to Docker Hub and use that image on remote server
* Option 3: use already deployed image from docker hub

# Option 1
* SSH into remote server
* Open port 8080/tcp in firewall (if you have firewall enabled on your server)
* Follow docker.md 
# Option 2
#### On local machine
* Login to docker hub using command : 
```bash
docker login
```
* Follow docker.md but instead of using docker-compose up -d (we don't want to start container on our local machine), use :
```bash
docker build --tag name:tag .
```
> Change name:tag with actual name you want image to have and tag with something that describes it, for example threejs-server:latest
* Tag image for docker hub 
```bash
docker tag name <your-docker-username>/name
```
> Change name to actual name of image you set in command above
* Push local image to docker hub
```bash
docker push <your-docker-username>/name
```
> Change name to actual name of image you set in command above
#### On remote server
* SSH into remote server
* Make sure that docker and docker-compose are installed
* Open port 8080/tcp in firewall (if you have firewall enabled on your server)
* Make empty project directory and cd into it
* Make docker-compose.yml file with content :
```yaml
version: '3'
services:
  api:
    image: <your-docker-username>/name
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=development
      - IP_ADDR=localhost
    volumes:
      - threejsData:/app/api/public
volumes:
  threejsData:
```
> You can see that we are using image: property to tell it to use remote image from Docker Hub
* Download image, start our container :
```bash
docker-compose up -d 
```
* You can verify container is running with :
```bash
docker container ps
```
> Web API will be running on http://<your-ip-address>:8080 , Docs are available at : http://<your-ip-address>:8080/docs

# Option 3

#### On remote server
* SSH into remote server
* Make sure that docker and docker-compose are installed
* Open port 8080/tcp in firewall (if you have firewall enabled on your server)
* Make empty project directory and cd into it
* Make docker-compose.yml file with content :
```yaml
version: '3'
services:
  api:
    image: dckhtbitsol/threejs-server
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=development
      - IP_ADDR=localhost
      - PORT=8080
      - URL=http://localhost
    volumes:
      - threejsData:/app/api/public
volumes:
  threejsData:
```

> Note that we are using image pushed to dckhtbitsol/threejs-server
* Download image, start our container :
```bash
docker-compose up -d 
```
* You can verify container is running with :
```bash
docker container ps
```
> Web API will be running on http://<your-ip-address>:8080 , Docs are available at : http://<your-ip-address>:8080/docs

### Customizing docker-compose.yml file
You can change/add following environment variables in this file :
  * NODE_ENV=production (If environment is test api wont log any requests) 
  * IP_ADDR=x.x.x.x (Change this to your IP address - this is used for swagger docs)
  * PORT=8080 (Change this if you dont want to run on port 8080)
  * URL=http://x.x.x.x (This will be host in api path response, should be same as IP_ADDR)
> If you change PORT environment variable, you should change "8080:8080" in ports property as well