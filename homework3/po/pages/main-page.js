const BasePage = require('./base-page');

class MainPage extends BasePage {

    constructor() {
        super();
        this.catalogueButton = element(by.css('.menu-toggler'));
    };

};

module.exports = MainPage;