const Vehicle = require('./vehicle');

function Motorbike(model) {
    Vehicle.call(this, model);
    this.type = 'motorbike';
    this.driverLicence = 'A';
};

Motorbike.prototype = Object.create(Vehicle.prototype);
Motorbike.prototype.constructor = Motorbike;

module.exports = Motorbike;