const Header = require('../components/global/header');

class BasePage {

    constructor() {
        this.header = new Header();
    };

}

module.exports = BasePage;