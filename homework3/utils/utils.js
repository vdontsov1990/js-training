const Wait = require('./wait');

class Utils {

	constructor() {
        this.wait = new Wait();
    };
    
};

module.exports = new Utils();