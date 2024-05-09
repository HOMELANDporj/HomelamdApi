// models/admin.js

const mongoose = require('mongoose');

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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
