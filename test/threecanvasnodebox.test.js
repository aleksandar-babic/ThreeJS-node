process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

describe ('ThreeCanvasNodeBox module', () => {
    //TODO Implement tests
    it('should test params to addBox function');
    it('should test renderToFile function');
    it('should test helper function for file extension recognition');
});