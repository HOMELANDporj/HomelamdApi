const mongoose = require("mongoose");
const Profile= require("./profileModel")

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
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },

  serviceRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest'
  }],
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification'
  }]

}, { timestamps: true });






// Middleware to create profile for a new user
userSchema.pre('save', async function(next) {
  try {
    // Only create profile if it doesn't already exist
    if (!this.profile) {
      // Create a new profile
      const newProfile = new Profile({
        user: this._id,
        fullName: this.name,
        address: this.homeAddress,
        organizationName: this.organizationName,
        contactInformation: this.contactInformation,
        emergencyContact: this.emergencyContact,
        phoneNumber: this.phoneNumber
        // Add other profile fields here
      });
      // Save the profile
      await newProfile.save();
      // Set the profile reference in the user document
      this.profile = newProfile._id;
    }
    next();
  } catch (error) {
    next(error);
  }
});








module.exports = mongoose.model("User", userSchema);
