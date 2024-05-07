const mongoose = require("mongoose");

const serviceRequestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pickupLocation: String,
  dropoffLocation: String,
  pickupTime: Date,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  }
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
