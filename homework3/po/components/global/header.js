const EC = protractor.ExpectedConditions;
const utils = require('../../../utils/utils');
class Header {

    constructor() {
        this.logo = element(by.css('a[class*=logo] > img'));
        this.searchField = element(by.css('input[class*=search]'));
        this.searchButton = element(by.css('button[class*=search]'));
        this.basketButton = element(by.css('a[class*=cart]'));
        this.compareProductsButton = element(by.css('a[class*=comparison]'));
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