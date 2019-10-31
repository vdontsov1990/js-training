const yargs = require('yargs').argv;

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // directConnect: true,  
    baseUrl: '',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: false,
        maxInstances: 2,
    },

    // multiCapabilities: [{s
    //     browserName: 'chrome',
    //     version: "66.0.3359.139"
    // }, {
    //     browserName: 'firefox'
    // }],

    specs: [
        `e2e/${yargs.spec || "*/*-spec.js"}`
    ],
    // restartBrowserBetweenTests: true,
    onPrepare: function () {
        browser.waitForAngularEnabled(false); 
    },

    beforeLaunch: function () {},
    onComplete: function () {},

    SELENIUM_PROMISE_MANAGER: false,

    allScriptsTimeout: 200000,
    getPageTimeout: 100000,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};