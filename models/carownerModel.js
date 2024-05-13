/**
 * @fileoverview This file contains the schema and model for a car owner.
 * @module models/carOwner
 */

/**
 * @typedef {Object} CarOwnerSchema
 * @property {String} name - The name of the car owner.
 * @property {String} password - The password of the car owner.
 * @property {String} phoneNumber - The phone number of the car owner.
 * @property {String} address - The address of the car owner.
 * @property {String} city - The city of the car owner.
 * @property {String} country - The country of the car owner.
 * @property {String} role - The role of the car owner, default is 'carOwner'.
 * @property {String} idPictureFront - The front side of the car owner's ID.
 * @property {String} idPictureBack - The back side of the car owner's ID.
 * @property {String} selfie - A selfie of the car owner.
 * @property {Array} notifications - An array of notification IDs.
 * @property {Array} vehicles - An array of vehicle IDs.
 * @property {Array} drivers - An array of driver IDs.
 * @property {Array} serviceRequests - An array of service request IDs.
 * @property {Date} createdAt - The timestamp when the car owner was created.
 * @property {Date} updatedAt - The timestamp when the car owner was last updated.
 */

/**
 * @typedef {Object} CarOwner
 * @property {CarOwnerSchema} schema - The schema for the car owner.
 * @property {mongoose.Model} model - The Mongoose model for the car owner.
 */

/**
 * @function
 * @param {mongoose} mongoose - The Mongoose instance.
 * @param {Profile} Profile - The Profile model.
 * @returns {CarOwnerSchema} A schema for the car owner.
 */
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



/**
 * @function
 * @param {CarOwnerSchema.post('save', async function(next) {
* @param {CarOwnerSchema} this - The CarOwner instance.
* @param {Function} next - The next middleware function.
* @description This middleware creates a profile for a new car owner if it doesn't already exist.
* @throws {Error} If an error occurs while creating the profile.
*/
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
