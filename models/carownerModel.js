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
  idPictureFront: {
    ype: String
 }, // Path to the back of ID picture
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
