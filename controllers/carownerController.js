/**
 * Import necessary modules and models.
 * @param {import('express-async-handler')} asyncHandler - Express middleware for handling asynchronous operations.
 * @param {import('bcrypt')} bcrypt - Library for password hashing.
 * @param {import('joi')} Joi - Library for input validation.
 * @param {import('./carownerModel')} CarOwner - Model for car owners.
 * @param {import('jsonwebtoken')} jwt - Library for generating JSON Web Tokens.
 * @param {import('./driverModel')} Driver - Model for drivers.
 * @param {import('./vehicleModel')} Vehicle - Model for vehicles.
 */
const asyncHandler=require("express-async-handler")
const bcrypt = require('bcryptjs')
const Joi = require("joi"); // Import Joi for validation
const CarOwner = require('../models/carownerModel');
const jwt = require("jsonwebtoken");
const Driver = require('../models/driverModel');
const Vehicle = require('../models/vechelModel');

 


/**
 * Create a new car owner.
 * @param {import('express').Request} req - Express request object containing the request body.
 * @param {import('express').Response} res - Express response object for sending HTTP responses.
 * @returns {import('express').Response} - Express response object containing the created car owner.
 */
const createCarOwner = asyncHandler(async (req, res) => {
 // console.log("The body requested to post is => ", req.body);
 
  const {
    name,
    phoneNumber, 
    password,
    address,
    city,
    country,
  } = req.body;
  const idPictureFront =await req.files['idPictureFront'][0].filename;
  const idPictureBack = await req.files['idPictureBack'][0].filename;
  const selfie =await req.files['selfie'][0].filename;
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
    idPictureBack,
    selfie,
    address,
    city,
    country,
  });

  res.status(201).json(carOwner);
});

/**
 * Create a new driver.
 * @param {import('express').Request} req - Express request object containing the request body.
 * @param {import('express').Response} res - Express response object for sending HTTP responses.
 * @returns {import('express').Response} - Express response object containing the created driver.
 */
const createDriver = asyncHandler(async (req, res) => {
  //console.log("The body requested to post is => ", req.body);

  const {
      name,
      phoneNumber,
      password,
      vehicle,
      homeAddress, 
      workAddress,
      
    } = req.body;

  const idPictureFront = req.files['idPictureFront'][0].filename;
  const idPictureBack = req.files['idPictureBack'][0].filename;
  const selfie = req.files['selfie'][0].filename;

  // Define Joi schema for validation
  const driverSchema = Joi.object({
      name: Joi.string().required().min(3).max(50),
      licenseNumber: Joi.string().optional(),
      vehicle: Joi.string().optional(),
      phoneNumber: Joi.string().regex(/^\d{10}$/).required(),
      password: Joi.string().min(8).required(),
      homeAddress: Joi.string().optional(),
      // idPictureFront: Joi.string().optional(),
      // idPictureBack: Joi.string().optional(),
      // selfie: Joi.string().optional(),
      workAddress: Joi.string().optional(),
      
      
      // Assuming vehicle is provided as ID of an existing vehicle
  });

  // Validate the request body against the schema
  const { error } = driverSchema.validate(req.body);

  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }
    // Hash the given password
const hashedPassword = await bcrypt.hash(password, 10);


  // Create the driver
  const driver = new Driver({
      name,
      phoneNumber,
      password: hashedPassword,
      idPictureFront,
      idPictureBack,
      selfie,
      vehicle,
      homeAddress, 
      workAddress,
      user: req.user.userId, // Assuming user ID is extracted from JWT payload
  });

  // Save the new driver to the database
  await driver.save();
  res.status(201).json(driver);
});





/**
 * Create a new vehicle.
 * @param {import('express').Request} req - Express request object containing the request body.
 * @param {import('express').Response} res - Express response object for sending HTTP responses.
 * @returns {import('express').Response} - Express response object containing the created vehicle.
 */
const createVehicle = async (req, res) => {
  
  // Extract necessary data from the request body
  const { make, model, year, licensePlate } = req.body;
  const librai = req.files['librai'][0].filename;
  const carimg=  req.files['carimg'][0].filename;

  // Define Joi schema for vehicle creation
  const vehicleSchema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    licensePlate: Joi.string().required(),
    //librai: Joi.string().required(), // Assuming 'librai' is the filename
  });
  try {
    // Validate request body against schema
    const { error } = vehicleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Assuming the authenticated user's ID is available in the request object
    const userId = req.user.userId;

    // Create a new vehicle instance
    const vehicle = new Vehicle({
      make,
      model, 
      year,
      licensePlate,
      librai,
      carimg,
      owner: userId // Assign the owner ID
    });

    // Save the new vehicle to the database
    await vehicle.save();

    // Return success response
    res.status(201).json({ message: 'Vehicle created successfully', vehicle });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};






 /**
 * Get all car owners.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {import('express').Response} - Express response object containing the array of car owners.
 */
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

/**
 * Update a car owner.
 * @param {import('express').Request} req - Express request object containing the request body and params.
 * @param {import('express').Response} res - Express response object for sending HTTP responses.
 * @returns {import('express').Response} - Express response object containing the updated car owner.
 */
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
  


/**
 * Delete a car owner.
 * @param {import('express').Request} req - Express request object containing the params.
 * @param {import('express').Response} res - Express response object for sending HTTP responses.
 * @returns {import('express').Response} - Express response object containing a success message.
 */
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

 /**
 * Sign in a car owner.
 * @param {import('express').Request} req - Express request object containing the request body.
 * @param {import('express').Response} res - Express response object for sending HTTP responses.
 * @returns {import('express').Response} - Express response object containing a success message and a JSON Web Token.
 */
const signinCarOwner = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Basic validation
  if (!phoneNumber || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    // Find the user by phone number
    const carowner = await CarOwner.findOne({ phoneNumber });

    if (!carowner) {
      res.status(400).json({ message: "Invalid phone number" });
      return;
    }

    // Compare hashed password with the provided password
    const isMatch = await bcrypt.compare(password, carowner.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" }); // Use 401 for unauthorized access
      return;
    }

    // Generate JWT with 10 minutes expiration time (you can adjust expiresIn)
    const payload = {
      userId: carowner._id,
      name: carowner.name, // Include desired user data in payload
      phoneNumber: carowner.phoneNumber,
    };
   // console.log(user)
    const token = jwt.sign({
      user:{
        
          userId: carowner._id,
          name: carowner.name, // Include desired user data in payload
          phoneNumber: carowner.phoneNumber,
          address: carowner.address,
          phoneNumber: carowner.phoneNumber,
          city: carowner.city,
           country: carowner.country,
          idPictureFront: carowner.idPictureFront,
          idPictureBack: carowner.idPictureBack,
          selfie: carowner.selfie,
         
        
      },}, 
      process.env.TOKEN_SECRET, { expiresIn: "60m" });

    res.status(200).json({
      message: "Login successful",
      token,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    return // Consider more specific error handling
  }
});







module.exports = {
    createCarOwner,
    getAllCarOwners,
    deleteCarOwner,
    updateCarOwner,
    signinCarOwner,
    createDriver,
    createVehicle,

}