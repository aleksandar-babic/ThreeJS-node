### Important notes
##### GNU/Linux distributions must have installed packages libcairo2-dev, libjpeg-dev, libgif-dev in order to get GL node module working.
### How to for Debian based distros (including *buntu, Linux Mint, Elementary OS, etc.)
```bash
    sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
```
### How to for RHEL based distros (including CentOS)
```bash
    sudo yum install libcairo2-dev libjpeg-dev libgif-dev
```
> Did not test if Windows/MacOS environments need any additional dependencies

### How to run examples?
```bash
    git clone https://bitbucket.org/brandtsolutions/threejs-server.git && cd threejs-server
    npm install
    npm run example-canvas # Will run box example using CanvasRenderer
    npm run example-webgl # Will run box example using WebGLRenderer
```
> Example output files will be in project's root directory.