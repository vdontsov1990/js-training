const Vehicle = require('./vehicle');

function Bicycle(model) {
    Vehicle.call(this, model);
    this.type = 'bicycle';
};

Bicycle.prototype = Object.create(Vehicle.prototype);
Bicycle.prototype.constructor = Bicycle;

Bicycle.prototype.licence = function() {
    console.log(`Driver licence for ${this.type} is not needed`);
};

module.exports = Bicycle;