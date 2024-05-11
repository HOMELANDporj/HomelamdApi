const mongoose = require("mongoose");

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

module.exports = mongoose.model("Vehicle", vehicleSchema);
