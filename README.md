### Important notes
##### GNU/Linux distributions must have installed additional packages in order to get GL node module working.
### How to for Debian based distros (including *buntu, Linux Mint, Elementary OS, etc.)
```bash
    sudo apt-get install -y libcairo2-dev libjpeg-dev libgif-dev libxi-dev build-essential mesa-common-dev
```
> Did not test if Windows/MacOS environments need any additional dependencies

### How to run examples?
```bash
    git clone https://bitbucket.org/brandtsolutions/threejs-server.git && cd threejs-server
    npm install
    npm run example-canvas # Will run box example using CanvasRenderer
    npm run example-webgl # Will run box example using WebGLRenderer
```
> Example output files will be in api/public directory.

### How to run Web API?
```bash
    # Assuming that you already have NodeJS and NPM installed
    # Assuming that you already installed additional dependencies from above
    git clone https://bitbucket.org/brandtsolutions/threejs-server.git && cd threejs-server
    npm install
    npm start
```
> Web API will be running on http://localhost:8080 , Docs are available at : http://localhost:8080/docs

### How to run Web API using docker?
```bash
    # Assuming that you already have Docker and docker-compose installed
    git clone https://bitbucket.org/brandtsolutions/threejs-server.git && cd threejs-server
    docker-compose up
```
> Web API will be running on http://localhost:8080 , Docs are available at : http://localhost:8080/docs