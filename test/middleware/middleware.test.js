var common = require("./../common");
var Breadcrumbs = require('./../../bin/middleware/breadcrumb');

it('# Breadcrumbs', function (done) {
  let req = {
    path: '/about/me'
  };
  let res = {};

  Breadcrumbs.default(req, res, () => {
    common.expect(req).to.have.property('breadcrumbs')
    common.expect(req.breadcrumbs[0]).to.deep.equal({
      slug: 'Home',
      href: '/',
      last: false
    })
    common.expect(req.breadcrumbs[1]).to.deep.equal({
      slug: 'About',
      href: '/about/',
      last: false
    })
    common.expect(req.breadcrumbs[2]).to.deep.equal({
      slug: 'Me',
      href: '/about/me/',
      last: true
    })
    done();
  });
});