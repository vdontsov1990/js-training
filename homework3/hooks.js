const HtmlReporter = require('protractor-beautiful-reporter');

module.exports = {

    onPrepare: () => {
        console.log(browser.capabilities)
        browser.waitForAngularEnabled(false);

        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter(this.protractorBeautifulReporterOpts)).getJasmine2Reporter();
    },

    beforeLaunch: () => {},

    onComplete: () => {},
    
};