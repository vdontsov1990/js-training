const { convertJsonsToXls } = require('./converter/json-converter');
const rootDir = require('path').resolve(__dirname);
const path = require('path');
const { watchToChangesInDir } = require('./watcher/dir-watcher');

const pathToJsons = path.join(rootDir, 'json');
convertJsonsToXls(pathToJsons, rootDir);

const pathToDir = path.join(rootDir, 'csv');
const outputJson = path.join(rootDir, 'watch.json');
watchToChangesInDir(pathToDir, outputJson);