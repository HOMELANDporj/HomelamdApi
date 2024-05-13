/**
 * @fileoverview This file contains the schema and model for the admin user.
 * @module models/admin
 */


const mongoose = require('mongoose');

/**
 * @typedef {import('mongoose').Schema} Schema
 */

/**
 * @typedef {import('mongoose').Document<any, any, Admin> & Admin} Admin
 */

/**
 * @typedef {import('mongoose').Model<Admin>} AdminModel
 */

/**
 * @param {Schema} schema - The Mongoose schema for the admin user.
 * @returns {AdminModel} The Mongoose model for the admin user.
 */


/**
 * @typedef {Object} AdminSchema
 * @property {String} username - The username of the admin user.
 * @property {String} password - The password of the admin user.
 * @property {String} email - The email of the admin user.
 * @property {String} fullName - The full name of the admin user.
 * @property {String} phoneNumber - The phone number of the admin user.
 * @property {String} role - The role of the admin user, which must be 'admin'.
 * @property {String} address - The address of the admin user.
 * @property {String} city - The city of the admin user.
 * @property {String} country - The country of the admin user.
 * @property {Date} dateOfBirth - The date of birth of the admin user.
 * @property {String} [avatar] - The avatar URL of the admin user.
 */
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  avatar: {
    type: String
  },
  // Any other fields you want to include
}, { timestamps: true });
// Middleware to create profile for a new driver 
driverSchema.pre('save', async function(next) {
  try {
    // Only create profile if it doesn't already exist
    if (!this.profile) {
      // Create a new profile
      const newProfile = new Profile({
        user: this._id,
        fullName: this.name,
        address: this.address,
        city: this.city,
        country:this.country,
        phoneNumber: this.phoneNumber
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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
