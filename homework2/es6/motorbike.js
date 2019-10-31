const Vehicle = require('./vehicle');

class Motorbike extends Vehicle {

    constructor(model) {
        super(model);
        this.type = 'motorbike';
        this.driverLicence = 'A';
    };

};

module.exports = Motorbike;