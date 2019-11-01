const yargs = require('yargs')
    .options({
        multiCaps: {
            alias: 'm',
            description: 'Use multi capabilities',
            type: 'boolean'
        },
        spec: {
            alias: 's',
            description: 'Path to spec files',
            type: 'string'
        }
    }).argv;

module.exports = {
    multiCaps: yargs.multiCaps === true ? true : false,
    spec: yargs.spec
};