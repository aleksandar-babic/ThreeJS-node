### Local development environment setup

First of all, you must install NodeJS(with NPM built in). NodeJS installation process is different on every operating system so I will just give you link to [official NodeJS installation page](https://nodejs.org/en/download/). You can verify that node and npm is installed running following commands:
```bash
node -v
npm -v
```
If you are on Debian based linux distribution you will need additional dependencies that will allow GL to compile in NodeJS environment. You can install these using following command :
```bash
sudo apt-get install -y libcairo2-dev libjpeg-dev libgif-dev libxi-dev build-essential mesa-common-dev
```

For Windows install GTK+ 2.x (!) Runtime from: https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer
Install Runtime at C:\GTK
Follow node-canvas installation: https://github.com/Automattic/node-canvas/wiki/Installation---Windows
-> more specifically get GTK 2.x (Win 64) bundle and copy to C:\GTK
-> then do step to install libjpeg-turbo (e.g. libjpeg-turbo-1.5.1-vc64.exe to C:\libjpeg-turbo64 if 64bit)

Once we have both node(with npm) and additional dependencies installed we can clone repository :
```bash
git clone https://bitbucket.org/brandtsolutions/threejs-server.git && cd threejs-server
```
Now that we have source code of project we can simply install node modules and run it
```bash
npm install
npm start
```
> From this point you can extend project with new features and push it to this git repository.

Test environment with Mocha test runner and chai(including http and as-promised) is already setup with dummy tests in test directory, to run Mocha use :
```bash
npm test
```
If you want mocha to watch for file changes and run tests automatically you can use :
```bash
npm run watch
```