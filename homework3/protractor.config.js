const HtmlReporter = require('protractor-beautiful-reporter');
const yargs = require('yargs')
    .options({
        multiCaps: {
            description: 'Use multi capabilities',
            type: 'boolean'
        },
    }).argv;

/**
 * CLI arguments
 */
const multiCaps = yargs.multiCaps === true ? true : false;

/**
 * Browser capatibilities
 */
const capabilities = {
    browserName: 'chrome',
    shardTestFiles: false,
    maxInstances: 2,
};

/**
 * Multi capatibilities
 */
const multiCapabilities = [{ 
        browserName: 'chrome',
        version: '66.0.3359.139',
    }, {
        browserName: 'firefox',
    }
];

const protractorConfig = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,  
    baseUrl: '',

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
        screenshotsSubfolder: 'images',
        jsonsSubfolder: 'jsons',
        takeScreenShotsOnlyForFailedSpecs: true,
        excludeSkippedSpecs: false,
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

exports.config = Object.assign({}, protractorConfig , multiCaps 
    ? { multiCapabilities: multiCapabilities} 
    : {capabilities: capabilities});