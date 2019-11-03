/**
 * Browser capatibilities
 */
const capabilities = {
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--disable-notifications']
        },
        shardTestFiles: false,
        maxInstances: 2,
    }
};

/**s
 * Multi capatibilities
 */
const multiCapabilities = {
    multiCapabilities: [{ 
        browserName: 'chrome',
        chromeOptions: {
            args: ['--disable-notifications']
        },
    }, {
        browserName: 'firefox',
        prefs: {
            'dom.webnotifications.enabled': false
        },
    }]
}

module.exports = { capabilities, multiCapabilities }