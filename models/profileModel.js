/**
 * @module Profile
 * @description This module contains the schema for the Profile model.
 */
const mongoose = require("mongoose");


/**
 * @typedef ProfileSchema
 * @description Schema for the Profile model.
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the associated User.
 * @property {String} fullName - The full name of the Profile owner.
 * @property {String} phoneNumber - The phone number of the Profile owner.
 * @property {String} profilePicture - The URL of the Profile picture.
 * @property {String} address - The address of the Profile owner.
 * @property {String} organizationName - The name of the organization associated with the Profile.
 * @property {String} contactInformation - Additional contact information for the Profile owner.
 * @property {Object} emergencyContact - Object containing the name and phone number of the Profile owner's emergency contact.
 * @property {String} emergencyContact.name - The name of the emergency contact.
 * @property {String} emergencyContact.phoneNumber - The phone number of the emergency contact.
 * @property {Object} timestamps - Object containing the createdAt and updatedAt timestamps.
 */

/**
 * @function ProfileSchema
 * @description Creates a new schema for the Profile model.
 * @returns {ProfileSchema} A new schema for the Profile model.
 */


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
