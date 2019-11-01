/**
 * Browser capatibilities
 */
const capabilities = {
    capabilities: {
        browserName: 'chrome',
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
    }, {
        browserName: 'firefox',
    }]
}

module.exports = { capabilities, multiCapabilities }