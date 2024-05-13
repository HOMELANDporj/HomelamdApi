/**
 * @module ServiceRequest
 * @description This module contains the schema for a ServiceRequest.
 */
const mongoose = require("mongoose");



/**
 * @typedef {Object} ServiceRequestSchema
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user who requested the service.
 * @property {string} pickupLocation - The location where the service will be picked up.
 * @property {string} dropoffLocation - The location where the service will be dropped off.
 * @property {string} pickupTime - The time when the service will be picked up.
 * @property {string} status - The status of the service request, can be 'pending', 'accepted', 'completed', or 'cancelled'.
 * @property {mongoose.Schema.Types.ObjectId} assignedDriver - The ID of the driver assigned to this service request.
 */

/**
 * @typedef {mongoose.Model} ServiceRequestModel
 * @description This is the Mongoose model for a ServiceRequest.
 */

/**
 * @function createServiceRequestSchema
 * @description This function creates the schema for a ServiceRequest.
 * @returns {ServiceRequestSchema} The schema for a ServiceRequest.
 */


const serviceRequestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pickupLocation: String,
  dropoffLocation: String,
  pickupTime: String,
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
/**
 * @function createServiceRequestModel
 * @description This function creates the Mongoose model for a ServiceRequest.
 * @param {ServiceRequestSchema} schema - The schema for a ServiceRequest.
 * @returns {ServiceRequestModel} The Mongoose model for a ServiceRequest.
 */
module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
