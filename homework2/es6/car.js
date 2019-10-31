
const Vehicle = require('./vehicle');

class Car extends Vehicle {

    constructor(model) {
        super(model);
        this.type = 'car';
        this.driverLicence = 'B';
    };

};

module.exports = Car;