/**
 * @module Notification
 * @description This module contains the schema and model for the Notification collection.
 */
const mongoose = require("mongoose");

/**
 * @typedef {Object} NotificationSchema
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user who the notification is for.
 * @property {String} content - The content of the notification.
 * @property {Boolean} [readStatus=false] - Whether the notification has been read or not. Defaults to false.
 */

const notificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: String,
  readStatus: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


/**
 * @function createNotificationModel
 * @description Creates a Mongoose model for the Notification collection using the provided schema.
 * @param {NotificationSchema} schema - The Mongoose schema for the Notification collection.
 * @returns {NotificationModel} The created Mongoose model for the Notification collection.
 */

module.exports = mongoose.model("Notification", notificationSchema);
