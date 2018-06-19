var common = require("./../common");

it('# Get Home Page', function (done) {
  common.request(common.app)
    .get('/')
    .end(function (err, res) {
      common.expect(res.status).to.equal(200)
      common.expect(common.isHTML(res.text)).to.be.true
      done();
    });
});

it('# Get About Page', function (done) {
  common.request(common.app)
    .get('/about')
    .end(function (err, res) {
      common.expect(res.status).to.equal(200)
      common.expect(common.isHTML(res.text)).to.be.true
      done();
    });
});

it('# Get Portfolio Page', function (done) {
  common.request(common.app)
    .get('/portfolio')
    .end(function (err, res) {
      common.expect(res.status).to.equal(200)
      common.expect(common.isHTML(res.text)).to.be.true
      done();
    });
});

it('# Get Blog Piece', function (done) {
  common.request(common.app)
    .get('/portfolio/ministry-of-furniture')
    .end(function (err, res) {
      common.expect(res.status).to.equal(200)
      common.expect(common.isHTML(res.text)).to.be.true
      done();
    });
});

it('# Fail Get Blog Piece', function (done) {
  common.request(common.app)
    .get('/portfolio/asdasd')
    .end(function (err, res) {
      common.expect(res.status).to.equal(404)
      common.expect(common.isHTML(res.text)).to.be.true
      done();
    });
});

it('# Get Technologies Page', function (done) {
  common.request(common.app)
    .get('/technologies')
    .end(function (err, res) {
      common.expect(res.status).to.equal(200)
      common.expect(common.isHTML(res.text)).to.be.true
      done();
    });
});

it('# Get Contact Page', function (done) {
  common.request(common.app)
    .get('/contact')
    .end(function (err, res) {
      common.expect(res.status).to.equal(200)
      common.expect(common.isHTML(res.text)).to.be.true
      done();
    });
});

it('# Redirect To 404', function (done) {
common.request(common.app)
  .get('/asdasdasd')
  .end(function (err, res) {
    common.expect(res.status).to.equal(404)
    common.expect(common.isHTML(res.text)).to.be.true
    done();
  });
});