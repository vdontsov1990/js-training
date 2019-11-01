const { capabilities, multiCapabilities } = require('./browser.capabilities');
const cliArgs = require('./cli.run.args');
const hooks = require('./hooks');

const protractorConfig = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: '',

    // Path to spec files
    specs: [
        `e2e/${cliArgs.spec || '*/*-spec.js'}`
    ],

    SELENIUM_PROMISE_MANAGER: false,

    allScriptsTimeout: 200000,
    getPageTimeout: 100000,

    // Test framework
    framework: 'jasmine',

    // Jasmine options
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    // Protractor beautiful reporter options
    protractorBeautifulReporterOpts: {
        baseDirectory: 'tmp/screenshots',
        screenshotsSubfolder: 'images',
        jsonsSubfolder: 'jsons',
        takeScreenShotsOnlyForFailedSpecs: true,
        excludeSkippedSpecs: false,
    },
};

exports.config = Object.assign({}, 
    protractorConfig, 
    cliArgs.multiCaps ? multiCapabilities : capabilities, 
    hooks
);