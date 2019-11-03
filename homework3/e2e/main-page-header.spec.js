const world = require('../po/world');

describe('Main page header', () => {
    beforeAll(async () => {
        await browser.manage().deleteAllCookies();
        await browser.manage().window().maximize();
        await browser.get(browser.baseUrl);
    });

    it(`Verify that Main Page url is equal to the ${browser.baseUrl}`, async () => {
        const url = await browser.getCurrentUrl();

        expect(url).toEqual(browser.baseUrl, 'Base URL');
    });

    it(`Verify that Home Page title is equal to the 'Интернет-магазин ROZETKA™: официальный сайт самого популярного онлайн-гипермаркета в Украине'`, async () => {
        const title = await browser.getTitle();

        expect(title).toEqual('Интернет-магазин ROZETKA™: официальный сайт самого популярного онлайн-гипермаркета в Украине', 'Page title');
    });

    it(`Verify that Logo is displayed`, async () => {
        const logo = await world.mainPage.header.logo;
        
        expect(logo.isDisplayed()).toBe(true, 'Logo is displayed');
    });

    it(`Verify that Search field is displayed`, async () => {
        const searchField = await world.mainPage.header.searchField;

        expect(searchField.isDisplayed()).toBe(true, 'Search field is displayed');
    });

    it(`Verify that Search button is displayed`, async () => {
        const searchButton = await world.mainPage.header.searchButton;

        expect(searchButton.isDisplayed()).toBe(true);
    });

    it(`Verify that Cart button is displayed`, async () => {
        const basketButton = await world.mainPage.header.basketButton;

        expect(basketButton.isDisplayed()).toBe(true, 'Cart button is displayed');
    });

    it(`Verify that Compare products button is displayed`, async () => {
        const compareProductsButton = await world.mainPage.header.compareProductsButton;

        return expect(await compareProductsButton.isDisplayed()).toBe(true, 'Compare produts butto is displayed');
    });

});

