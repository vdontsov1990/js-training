const Vehicle = require('./vehicle');

function Car(model) {
    Vehicle.call(this, model);
    this.type = 'car';
    this.driverLicence = 'B';
};

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

module.exports = Car;