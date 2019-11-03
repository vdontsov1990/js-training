const { capabilities, multiCapabilities } = require('./browser.capabilities');
const cliArgs = require('./cli.run.args');
const HtmlReporter = require('protractor-beautiful-reporter');
const fs = require('fs');

const protractorConfig = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'https://rozetka.com.ua/',

    // Path to spec files
    specs: [
        `e2e/${cliArgs.spec || '*.spec.js'}`
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

    params: {
        timeout: 20000,
    },

    onPrepare: () => {
        deleteFiles('tmp');
        browser.waitForAngularEnabled(false);

        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'tmp/screenshots',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            takeScreenShotsOnlyForFailedSpecs: true,
            excludeSkippedSpecs: false,
        }).getJasmine2Reporter());
    },

    beforeLaunch: () => {},

    onComplete: () => {},

    
};

const deleteFiles = path => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const curPath = path + "/" + file;
            fs.lstatSync(curPath).isDirectory() ? deleteFiles(curPath) : fs.unlinkSync(curPath);
        });
        fs.rmdirSync(path);
    };
};

exports.config = Object.assign({}, 
    protractorConfig, 
    cliArgs.multiCaps ? multiCapabilities : capabilities
);