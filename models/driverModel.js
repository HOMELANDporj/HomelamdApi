const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  serviceRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
