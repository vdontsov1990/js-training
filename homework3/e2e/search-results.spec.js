const world = require('../po/world');

const firstResult = 0;

describe('Search results page:', () => {
    beforeAll(async () => {
        await browser.manage().deleteAllCookies();
        await browser.manage().window().maximize();
        await browser.get(browser.baseUrl);

        this.searchedProduct = 'Xiaomi Mi 8 Lite';
        await world.mainPage.header.enterIntoSearchField(this.expectedProduct);
        await world.mainPage.header.clickSearchButton();
    });

    it(`URL`, async () => {
        const url = await browser.getCurrentUrl();

        expect(url).toEqual(browser.baseUrl + '/search/?text=' + this.searchedProduct.split(' ').join('+'), 'Search text');
    });   
    
    it(`Search text is ${this.searchedProduct}`, async () => {

        const serchText = await world.searchResultsPage.serchText;

        expect(serchText.isDisplayed()).toBe(true, 'Search text is displayed');
        expect(serchText.getText()).toEqual(this.searchedProduct, 'Search text');
    });

    it(`Product images`, async () => {
        const productImages = await world.searchResultsPage.productImages;

        expect(productImages[firstResult].isDisplayed()).toBe(true, 'Product images are displayed');
    });

    it(`Product titles`, async () => {
        const productTitles = await world.searchResultsPage.productTitles;

        expect(productTitles[firstResult].isDisplayed()).toBe(true, 'Product titles are displayed');
        expect(productTitles[firstResult].getText()).toContain(this.searchedProduct, 'First product title');
    });

    it(`Product images`, async () => {
        const productImages = await world.searchResultsPage.productImages;

        expect(productImages[firstResult].isDisplayed()).toBe(true, 'Product images are displayed');
    });

    it(`Product prices`, async () => {
        const priceValues = await world.searchResultsPage.priceValues;
        const priceCurrencies = await world.searchResultsPage.priceCurrencies;

        expect(priceValues[firstResult].isDisplayed()).toBe(true, 'Prices are displayed');
        expect(priceCurrencies[firstResult].getText()).toEqual('грн', 'Currency');
    });

    it(`Rating stars`, async () => {
        const ratingStars = await world.searchResultsPage.ratingStars;

        expect(ratingStars[firstResult].isDisplayed()).toBe(true, 'Rating stars are displayed');
    });

    it(`Reviews`, async () => {
        const reviews = await world.searchResultsPage.reviews;

        expect(reviews[firstResult].isDisplayed()).toBe(true, 'Reviews are displayed');
    });
});

