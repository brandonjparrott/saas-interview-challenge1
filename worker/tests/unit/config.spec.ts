import { expect } from 'chai';
import 'mocha';

describe('Config', () => {

    let config: any;

    before(() => {
        process.env.NODE_ENV = 'development';
        process.env.PORT = '8080';
        process.env.REDIS_HOST = 'localhost';
        process.env.REDIS_PASS = 'mypass';
        process.env.REDIS_PORT = '5000';
        process.env.WORK_QUEUE = 'my-queue';
        
        config = require('../../src/config');
    });

    after(() => {
        delete process.env.NODE_ENV;
        delete process.env.PORT;
        delete process.env.REDIS_HOST;
        delete process.env.REDIS_PASS;
        delete process.env.REDIS_PORT;
        delete process.env.WORK_QUEUE;
    });

    it('should return correct Environment', () => {
        expect(config.ENVIRONEMENT).to.equal('development');
    });

    it('should return correct Port', () => {
        expect(config.PORT).to.equal('8080');
    });

    it('should return correct Redis Host', () => {
        expect(config.REDIS_HOST).to.equal('localhost');
    });

    it('should return correct Redis Password', () => {
        expect(config.REDIS_PASS).to.equal('mypass');
    });

    it('should return correct Redis Port', () => {
        expect(config.REDIS_PORT).to.equal('5000');
    });

    it('should return correct Work Queue', () => {
        expect(config.WORK_QUEUE).to.equal('my-queue');
    });

});