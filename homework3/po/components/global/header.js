const EC = protractor.ExpectedConditions;

class Header {

    constructor() {
        this.logo = element(by.css('.header__logo > img'));
        this.searchField = element(by.css('input[name=search]'));
        this.searchButton = element(by.css('button[class*="search-form__submit"]'));
        this.basketButton = element(by.css('a[class*="button_type_basket"]'));
        this.compareProductsButton = element(by.css('a[class*=compare]'));
    };

    async enterIntoSearchField(text) {
        const searchField = await this.searchField;
        await browser.wait(EC.elementToBeSelected(searchField), browser.params.timeout);
        await searchField.sendKeys(text); 
    };

    async clickSearchButton() {
        const searchButton = await this.searchButton;
        await browser.wait(EC.elementToBeClickable(searchField), browser.params.timeout);
        await searchButton.click();
    };

};

module.exports = Header;