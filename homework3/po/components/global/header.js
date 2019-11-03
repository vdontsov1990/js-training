const EC = protractor.ExpectedConditions;
const utils = require('../../../utils/utils');
class Header {

    constructor() {
        this.logo = element(by.css('.header__logo > img'));
        this.searchField = element(by.css('input[search-input]'));
        this.searchButton = element(by.css('button[class*="search-form__submit"]'));
        this.basketButton = element(by.css('a[class*="button_type_basket"]'));
        this.compareProductsButton = element(by.css('a[class*=compare]'));
    };

    async enterIntoSearchField(text) {
        const searchField = await this.searchField;
        await browser.wait(EC.visibilityOf(searchField), browser.params.timeout);
        await searchField.sendKeys(text); 
    };

    async clickSearchButton() {
        const searchButton = await this.searchButton;
        await browser.wait(EC.elementToBeClickable(searchButton), browser.params.timeout);
        await searchButton.click();
        await utils.wait.forPreloaderDissapear();
    };

};

module.exports = Header;