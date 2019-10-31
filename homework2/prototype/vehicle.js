function Vehicle(model) {
    this.model = model;
};

Vehicle.prototype.ride = function() {
    console.log(`${this.model} ${this.type} is ridding now`);
};

Vehicle.prototype.licence = function() {
    console.log(`Required '${this.driverLicence}' driver licence`);
};

module.exports = Vehicle;