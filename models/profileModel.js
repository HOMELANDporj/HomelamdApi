const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: String,
  phoneNumber: String,
  profilePicture: String,
  address: String,
  organizationName: String,
  contactInformation: String,
  emergencyContact: {
    name: String,
    phoneNumber: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
