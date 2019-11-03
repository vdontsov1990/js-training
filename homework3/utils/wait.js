const EC = protractor.ExpectedConditions;

class Wait {

    constructor() {
        this.preloader = element(by.css('.preloader'));
    };

    async forPreloaderDissapear() {
        const preloader = await this.preloader;
        await browser.wait(EC.invisibilityOf(preloader), browser.params.timeout);
        await browser.driver.sleep(200);
    };
}

module.exports = Wait;