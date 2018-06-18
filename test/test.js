const request = require('supertest');
const expect = require('chai').expect
var app = require('./../bin/main.js');

describe('Testing The Pages', function () {
  it('Should Load Home Page', function (done) {
    request(app)
      .get('/')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done();
      });
  });

  it('Should Load About Page', function (done) {
    request(app)
      .get('/about')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done();
      });
  });

  it('Should Load Portfolio Page', function (done) {
    request(app)
      .get('/portfolio')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done();
      });
  });

  it('Should Load Blog Piece', function (done) {
    request(app)
      .get('/portfolio/ministry-of-furniture')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done();
      });
  });

  it('Should Fail To Load Blog Piece', function (done) {
    request(app)
      .get('/portfolio/asdasd')
      .end(function (err, res) {
        expect(res.status).to.equal(404)
        done();
      });
  });

  it('Should Load Technologies Page', function (done) {
    request(app)
      .get('/technologies')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done();
      });
  });

  it('Should Load Contact Page', function (done) {
    request(app)
      .get('/contact')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done();
      });
  });

  it('Should Redirect To 404 Page', function (done) {
    request(app)
      .get('/asdasdasd')
      .end(function (err, res) {
        expect(res.status).to.equal(404)
        done();
      });
  });
});