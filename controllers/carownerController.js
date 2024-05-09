const asyncHandler=require("express-async-handler")
const bcrypt = require("bcrypt")
const Joi = require("joi"); // Import Joi for validation
const CarOwner = require('../models/carownerModel');

// Create Car Owner
const createCarOwner = asyncHandler(async (req, res) => {
  console.log("The body requested to post is => ", req.body);
 
  const {
    name,
    phoneNumber,
    password,
    idPictureFront,
    address,
    city,
    country,
  } = req.body;

  // Define Joi schema for validation
  const carOwnerSchema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    phoneNumber: Joi.string().regex(/^\d{10}$/).required(),
    password: Joi.string().min(8).required(),
    idPictureFront: Joi.string().optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
  });

  // Validate the request body against the schema
  const { error } = carOwnerSchema.validate(req.body, { allowUnknown: true }); // Allow unknown fields

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if the phone number is already registered
  const carOwnerAvailable = await CarOwner.findOne({ phoneNumber });
  if (carOwnerAvailable) {
    return res.status(400).json({ message: "Phone number already registered. Please use a different phone number." });
  }

  // Hash the given password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the car owner
  const carOwner = await CarOwner.create({
    name,
    phoneNumber,
    password: hashedPassword,
    idPictureFront,
    address,
    city,
    country,
  });

  res.status(201).json(carOwner);
});




  // Get All Car Owners
const getAllCarOwners = async (req, res) => {
    try {
      // Check if the user is authorized
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const carOwners = await CarOwner.find();
      res.status(200).json(carOwners);
    } catch (error) {
      console.error('Error fetching car owners:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Update Car Owner
const updateCarOwner = async (req, res) => {
    try {
      const { name, password, phoneNumber, address, city, country, idPictureFront } = req.body;
      
      // Check if the user is authorized
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const updateFields = {};
      if (name) updateFields.name = name;
      if (password) updateFields.password = password;
      if (phoneNumber) updateFields.phoneNumber = phoneNumber;
      if (address) updateFields.address = address;
      if (city) updateFields.city = city;
      if (country) updateFields.country = country;
      if (idPictureFront) updateFields.idPictureFront = idPictureFront;
  
      const carOwner = await CarOwner.findByIdAndUpdate(req.params.id, updateFields, { new: true });
      if (!carOwner) {
        return res.status(404).json({ message: 'Car owner not found' });
      }
      res.status(200).json({ message: 'Car owner updated successfully', carOwner });
    } catch (error) {
      console.error('Error updating car owner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  


  // Delete Car Owner
const deleteCarOwner = async (req, res) => {
    try {
      // Check if the user is authorized
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const carOwner = await CarOwner.findByIdAndDelete(req.params.id);
      if (!carOwner) {
        return res.status(404).json({ message: 'Car owner not found' });
      }
      res.status(200).json({ message: 'Car owner deleted successfully' });
    } catch (error) {
      console.error('Error deleting car owner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = {
    createCarOwner,
    getAllCarOwners,
    deleteCarOwner,
    updateCarOwner
}