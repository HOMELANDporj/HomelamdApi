const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true // This unique constraint should be removed
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
    required: true // Remove the unique constraint from here
  }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
