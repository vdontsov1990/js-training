const Vehicle = require('./vehicle');

class Bicycle extends Vehicle {

    constructor(model) {
        super(model);
        this.type = 'bicycle';
    };

    licence() {
        console.log(`Driver licence for ${this.type} is not needed`);
    };

};

module.exports = Bicycle;