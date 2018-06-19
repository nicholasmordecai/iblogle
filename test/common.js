const request = require('supertest');
const expect = require('chai').expect;
const isHTML = require('is-html');
var app = require('./../bin/main.js');

var options = {
    foo: "foo"
};

exports.options = options;
exports.expect = expect;
exports.request = request;
exports.app = app;
exports.isHTML = isHTML;