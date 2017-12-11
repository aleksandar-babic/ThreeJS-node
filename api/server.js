const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const controller = require('./controller');
const port = 8080;

//Don't use morgan logging in test environment
if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); //Apache style logs
}

//Setup body parser to support json
app.use(bodyParser.json());
app.use(bodyParser.raw({type: 'application/json'}));

//Setup route
app.route('/generate').post(controller.handleRequest);

app.listen(port, () => console.log(`Server is listening on port ${port}.`));

module.exports = app;