// models/carOwner.js

const mongoose = require('mongoose');

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

const CarOwner = mongoose.model('CarOwner', carOwnerSchema);

module.exports = CarOwner;
