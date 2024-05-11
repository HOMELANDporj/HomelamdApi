const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
    maxlength: 50,
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
  licenseNumber: {
    type: String,
   // required: true,
     // unique: true // This unique constraint should be removed
  },
  idPictureFront: {
    type:String,
    required: [true, "Id picture front is required"],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
  },
  idPictureBack: {
    type:String,
    required: [true, "Id picture back is required"],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
  },
  selfie: {
    type:String,
    required: [true, "Selfie is required"],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  serviceRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest'
  }],
  role: {
    type: String,
    enum: ['driver',],
    default: 'driver',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Remove the unique constraint from here
  }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
