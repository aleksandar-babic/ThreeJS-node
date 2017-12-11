"use strict";
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs.json');

const controller = require('./controller');
const port = 8080;

//Don't use morgan logging in test environment
if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); //Apache style logs
}

//Setup static files directory
app.use('/public', express.static(path.join(__dirname, 'public')));

//Setup body parser to support json
app.use(bodyParser.json());
app.use(bodyParser.raw({type: 'application/json'}));

//Setup route
app.route('/generate').post(controller.handleRequest);

//Setup docs
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Server is listening on port ${port}.`));

module.exports = app;