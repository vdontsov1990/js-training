const HtmlReporter = require('protractor-beautiful-reporter');
const yargs = require('yargs')
    .options({
        'multiCaps': {
            description: 'Use multi capabilities',
            type: 'boolean'
        },
    }).argv;

/**
 * CLI arguments
 */
const multiCaps = yargs.multiCaps === true ? true : false;

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,  
    baseUrl: '',

    multiCapabilities: multiCaps === true
        ? [{ 
            browserName: 'chrome',
            version: '66.0.3359.139',
        }, {
            browserName: 'firefox',
        }] : undefined,

    capabilities: multiCaps === false 
        ? {
            browserName: 'chrome',
            shardTestFiles: false,
            maxInstances: 2,
        } : undefined,

    specs: [
        `e2e/${yargs.spec || "*/*-spec.js"}`
    ],

    // restartBrowserBetweenTests: true,
    SELENIUM_PROMISE_MANAGER: false,

    allScriptsTimeout: 200000,
    getPageTimeout: 100000,
    framework: 'jasmine',

    /**
     * Jasmine options
     */
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    /**
     * Protractor beautiful reporter options
     */
    protractorBeautifulReporterOpts: {
        baseDirectory: 'tmp/screenshots',
    },

    /**
     * Hooks
     */
    onPrepare: function () {
        console.log(browser.capabilities)
        browser.waitForAngularEnabled(false);

        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter(this.protractorBeautifulReporterOpts)).getJasmine2Reporter();
    },

    beforeLaunch: function () {},

    onComplete: function () {},
};