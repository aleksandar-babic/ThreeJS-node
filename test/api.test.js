process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

describe ('Web API', () => {
    //TODO Web API tests
});