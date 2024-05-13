/**
 * @module Vehicle
 * @description This module contains the schema for a vehicle.
 */
const mongoose = require("mongoose");

/**
 * @typedef VehicleSchema
 * @description Schema for a vehicle.
 * @property {String} make - The make of the vehicle.
 * @property {String} model - The model of the vehicle.
 * @property {Number} year - The year of the vehicle.
 * @property {String} color - The color of the vehicle.
 * @property {String} licensePlate - The license plate of the vehicle.
 * @property {String} librai - The id picture front of the vehicle.
 * @property {String} carimg - The car image of the vehicle.
 * @property {ObjectId} owner - The owner of the vehicle.
 * @property {Array<ObjectId>} drivers - The drivers of the vehicle.
 * @property {Array<ObjectId>} serviceRequests - The service requests related to the vehicle.
 * @property {Number} mileage - The mileage of the vehicle.
 * @property {String} transmission - The transmission type of the vehicle.
 * @property {String} fuelType - The fuel type of the vehicle.
 * @property {String} engineSize - The engine size of the vehicle.
 * @property {Number} seatingCapacity - The seating capacity of the vehicle.
 * @property {Date} registrationDate - The registration date of the vehicle.
 * @property {Date} insuranceExpiryDate - The insurance expiry date of the vehicle.
 */

/**
 * @function createVehicleSchema
 * @description Creates a schema for a vehicle.
 * @returns {VehicleSchema} The schema for a vehicle.
 */
const vehicleSchema = mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
   // required: true
  },
  year: {
    type: Number,
   // required: true
  },
  color: String,
  licensePlate: {
    type: String,
   // required: true,
    //unique: true
  },
  
  librai: {
    type:String,
    required: [true, "Id picture front is required"],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
  },
  carimg: {
    type:String,
    required: [true, "Id picture front is required"],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  drivers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  }],
  serviceRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest'
  }],
  mileage: Number,
  transmission: String,
  fuelType: String,
  engineSize: String,
  seatingCapacity: Number,
  registrationDate: Date,
  insuranceExpiryDate: Date
}, { timestamps: true });

/**
 * @function mongooseModel
 * @description Creates a Mongoose model for a vehicle.
 * @param {String} modelName - The name of the Mongoose model.
 * @param {VehicleSchema} schema - The schema for the Mongoose model.
 * @returns {Model<VehicleDocument>} The Mongoose model for a vehicle.
 */
module.exports = mongoose.model("Vehicle", vehicleSchema);
