var common = require("./common");

/**
 * @description Helper function for requiring tests from files
 * @param {string} name 
 * @param {string} path
 * 
 */
function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

// Begin all tests
describe("Beginning Tests", function () {
    // Setup anything before all tests
    before(function() {});

    // Setup things before each test
    beforeEach(function () {});

    // import all the tests
    importTest("Route Checking", './pages/pages.test.js');
    importTest("Middleware Tests", './middleware/middleware.test.js');

    // After all tests are done
    after(function (done) {
        done();
        // setTimeout and process exit are to ensure the test pipeline quits
        setTimeout(function () {
            process.exit(0);
        }, 500)
    });
});