const Bicycle = require('./es6/bicycle');
const BicyclePrototype = require('./prototype/bicycle');
const Car = require('./es6/car');
const CarPrototype = require('./prototype/car');
const Motorbike = require('./es6/motorbike');
const MotorbikeProrotype = require('./prototype/motobike');
const { convertJsonsToXls } = require('./converter/json-converter');
const rootDir = require('path').resolve(__dirname);
const path = require('path');
const { watchToChangesInDir } = require('./watcher/dir-watcher');

const bicycle1 = new BicyclePrototype('Giant Trance Advanced Pro 29');
const car1 = new CarPrototype('Hyundai Accent');
const motorbike1 = new MotorbikeProrotype('Kawasaki Ninja');

const bicycle2 = new Bicycle('Author Elevation 2019');
const car2 = new Car('BMW X5');
const motorbike2 = new Motorbike('Honda CBR1000RR');

bicycle1.ride();
bicycle1.licence();

car1.ride();
car1.licence();

motorbike1.ride();
motorbike1.licence();

bicycle2.ride();
bicycle2.licence();

car2.ride();
car2.licence();

motorbike2.ride();
motorbike2.licence();

const pathToJsons = path.join(rootDir, 'json');
convertJsonsToXls(pathToJsons, rootDir);

const pathToDir = path.join(rootDir, 'csv');
const outputJson = path.join(rootDir, 'watch.json');
watchToChangesInDir(pathToDir, outputJson);