const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  make: String,
  model: String,
  year: String,
  licensePlate: {
    type: String,
    required: true,
    unique: true
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
  }]
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
