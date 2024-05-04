const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true, // Ensures unique phone numbers
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  idPictureFront: {
    type: String,
    // required: [true, "ID Picture (Front) is required"] // Optional, uncomment if needed
  },
  idPictureBack: {
    type: String,
    // required: [true, "ID Picture (Back) is required"] // Optional, uncomment if needed
  },
  selfie: {
    type: String,
    // required: [true, "Selfie is required"] // Optional, uncomment if needed
  },
  homeAddress: {
    type: String,
    // required: [true, "Home address is required"] // Optional, uncomment if needed
  },
  workAddress: String,
  emergencyContact: {
    name: String,
    phoneNumber: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
