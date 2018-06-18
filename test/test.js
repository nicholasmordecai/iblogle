const request = require('supertest');
const expect = require('expect.js');
var app = require('./../bin/main.js');


describe('Testing The Pages', function(){
  it ('Should Load Home Page', function(done){
    request(app)
      .get('/user')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
   });

  //  it ('Should Load Contact Page', function(done){
  //   request.get(app).end(function(error, res){
  //    expect(res).to.exist;
  //    expect(res.status).to.equal(200);
  //    done();
  //   });
  //  });
 });