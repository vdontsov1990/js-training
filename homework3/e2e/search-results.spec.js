const EC = protractor.ExpectedConditions;
const utils = require('../utils/utils');
const world = require('../po/world');

const firstResult = 0;
const searchedProduct = 'Xiaomi Mi 8 Lite';
const timeout = browser.params.timeout;

describe('Search results page:', () => {
    beforeAll(async () => {
        await browser.manage().deleteAllCookies();
        await browser.manage().window().maximize();
        await browser.get(browser.baseUrl);
        
        await world.mainPage.header.enterIntoSearchField(searchedProduct);
        await world.mainPage.header.clickSearchButton();
    });

    it(`URL`, async () => {
        const url = await browser.getCurrentUrl();

        expect(url).toContain(browser.baseUrl + 'search/?text=', 'URL');
    });   
    
    it(`Search text is ${searchedProduct}`, async () => {
        const serchText = await world.searchResultsPage.serchText;
        await browser.wait(EC.visibilityOf(serchText), timeout);

        expect(serchText.isDisplayed()).toBe(true, 'Search text is displayed');
        expect(serchText.getText()).toEqual(searchedProduct, 'Search text');
    });

    it(`Product images`, async () => {
        const productImages = await world.searchResultsPage.productImages;
        await browser.wait(EC.visibilityOf(productImages[firstResult]), timeout);

        expect(productImages[firstResult].isDisplayed()).toBe(true, 'Product images are displayed');
    });

    it(`Product titles`, async () => {
        const productTitles = await world.searchResultsPage.productTitles;
        await browser.wait(EC.visibilityOf(productTitles[firstResult]), timeout);

        expect(productTitles[firstResult].isDisplayed()).toBe(true, 'Product titles are displayed');
        expect(productTitles[firstResult].getText()).toContain(searchedProduct, 'First product title');
    });

    it(`Product images`, async () => {
        const productImages = await world.searchResultsPage.productImages;
        await browser.wait(EC.visibilityOf(productImages[firstResult]), timeout);

        expect(productImages[firstResult].isDisplayed()).toBe(true, 'Product images are displayed');
    });

    it(`Product prices`, async () => {
        const priceValues = await world.searchResultsPage.priceValues;
        const priceCurrencies = await world.searchResultsPage.priceCurrencies;
        await browser.wait(EC.visibilityOf(priceValues[firstResult]), timeout);

        expect(priceValues[firstResult].isDisplayed()).toBe(true, 'Prices are displayed');
        expect(priceCurrencies[firstResult].getText()).toEqual('грн', 'Currency');
    });

    it(`Rating stars`, async () => {
        const ratingStars = await world.searchResultsPage.ratingStars;
        await browser.wait(EC.visibilityOf(ratingStars[firstResult]), timeout);

        expect(ratingStars[firstResult].isDisplayed()).toBe(true, 'Rating stars are displayed');
    });

    it(`Reviews`, async () => {
        const reviews = await world.searchResultsPage.reviews;
        await browser.wait(EC.visibilityOf(reviews[firstResult]), timeout);

        expect(reviews[firstResult].isDisplayed()).toBe(true, 'Reviews are displayed');
    });
});

