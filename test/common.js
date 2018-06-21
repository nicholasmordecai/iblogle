const request = require('supertest');
const expect = require('chai').expect;
const isHTML = require('is-html');
process.env.NODE_ENV = 'test';
var app = require('./../build/server/main.js');

var options = {
    foo: "foo"
};

exports.options = options;
exports.expect = expect;
exports.request = request;
exports.app = app;
exports.isHTML = isHTML;