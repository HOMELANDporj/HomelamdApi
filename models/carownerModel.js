// models/carOwner.js

const mongoose = require('mongoose');
const Profile= require("./profileModel")

const carOwnerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  password: { 
    type: String, 
    required: true 
},
  phoneNumber: { 
    type: String 
},
  address: { 
    type: String 
},
  city: { 
    type: String
 },
  country: { 
    type: String 
},
role: {
  type: String,
  enum: ['carOwner',],
  default: 'carOwner',
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
notifications: [{
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Notification'
     }],
  vehicles: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Vehicle' 
    }],
  drivers: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Driver'
     }],
     serviceRequests: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'ServiceRequest'
     }]
}, { timestamps: true }
);
// Middleware to create profile for a new car owner
carOwnerSchema.pre('save', async function(next) {
  try {
    // Only create profile if it doesn't already exist
    if (!this.profile) {
      // Create a new profile
      const newProfile = new Profile({
        user: this._id,
        fullName: this.name,
        address: this.address,
        ciy:this.city,
        country: this.country,
        idPictureFront: this.idPictureFront,
        idPictureBack: this.idPictureBack,
        selfie: this.selfie,
        
       // organizationName: this.organizationName,
       // contactInformation: this.contactInformation,
       // emergencyContact: this.emergencyContact,
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

const CarOwner = mongoose.model('CarOwner', carOwnerSchema);

module.exports = CarOwner;
