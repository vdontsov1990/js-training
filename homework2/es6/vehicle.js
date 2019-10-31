class Vehicle {

    constructor(model) {
        this.model = model;
    };

    ride() {
        console.log(`${this.model} ${this.type} is ridding now`);
    };
    
    licence() {
        console.log(`Required '${this.driverLicence}' driver licence`);
    };

};

module.exports = Vehicle;