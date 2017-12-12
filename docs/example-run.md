### Run examples locally without Web API

First of all, you must install NodeJS(with NPM built in). NodeJS installation process is different on every operating system so I will just give you link to [official NodeJS installation page](https://nodejs.org/en/download/). You can verify that node and npm is installed running following commands:
```bash
node -v
npm -v
```
If you are on Debian based linux distribution you will need additional dependencies that will allow GL to compile in NodeJS environment. You can install these using following command :
```bash
sudo apt-get install -y libcairo2-dev libjpeg-dev libgif-dev libxi-dev build-essential mesa-common-dev
```

Once we have both node(with npm) and additional dependencies installed we can clone repository :
```bash
git clone https://bitbucket.org/brandtsolutions/threejs-server.git && cd threejs-server
```
Now that we have source code of project we can simply install node modules and run examples
```bash
npm install
npm run example-canvas #Runs CanvasRenderer example
npm run example-webgl #Runs WebGLRenderer example
```