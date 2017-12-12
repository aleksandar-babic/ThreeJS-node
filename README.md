# What is this? 

###### This project will allow you to run ThreeJS (cross-browser JavaScript library/API used to create and display animated 3D computer graphics in a web browser) in NodeJS environment without actual browser.
-----
##### Project contains following parts :
* 2 custom modules - They allow ThreeJS to run in NodeJS, one module is using CanvasRenderer, other one is using WebGLRenderer.
* Web API - Listens for requests on your-ip-address:8080/generate, renders scenes based on parameters on JSON object from request, writes PNG image with it and returns path to image.
* Dockerfile, .docker-compose.yml - This project is completely dockerizable with persistent storage using Docker Volume.
* Swagger - This project uses swagger to show all details about web api endpoints
* Docs - Detailed MarkDown files explanining how to setup various environments.
##### How to run it?
Depending on way you want to run it (locally for development, using docker container or on remote server) you can choose appropriate .md file in docs/ directory and see easiest way to do it.

> Web API will be running by default on http://your-ip-address:8080 , swagger docs will be available at : http://your-ip-address:8080/docs
