var common = require("./common");

it('Should Post To The Test API Route', function (done) {
request(app)
  .post('/api/test')
  .end(function (err, res) {
    expect(res.status).to.equal(200)
    expect(res.body).to.equal('abcdefg')
    done();
  });
});