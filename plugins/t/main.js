var PluginBase = require('./../../build/server/controllers/core/pluginController').Plugin;

class Plugin {
    constructor() {
        // console.log(this);
        console.log(`I'm consoled from within the main.js plugin =D`);
        let pluginBase = new PluginBase();
    }
}

module.exports = Plugin