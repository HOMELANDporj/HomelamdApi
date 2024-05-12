// controllers/driverController.js

const Driver = require('../models/driverModel');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const asyncHandler=require("express-async-handler")
// Get all drivers 
const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
// Get driver by ID
const getDriverById = async (req, res) => {
    try {
        // Extract the user ID from the JWT payload
        const userId = req.user.userId;

        // Find the driver by ID and ensure that it belongs to the authenticated user
        const driver = await Driver.findOne({ _id: req.params.id, user: userId });

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.json(driver);
    } catch (error) {
        console.error('Error fetching driver by ID:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// const createDriver = asyncHandler(async (req, res) => {
//     console.log("The body requested to post is => ", req.body);
 
//     const {
//         name,
//         phoneNumber,
//         password,
//         vehicle,
//         homeAddress, 
//         workAddress,
        
//       } = req.body;

//     const idPictureFront = req.files['idPictureFront'][0].filename;
//     const idPictureBack = req.files['idPictureBack'][0].filename;
//     const selfie = req.files['selfie'][0].filename;

//     // Define Joi schema for validation
//     const driverSchema = Joi.object({
//         name: Joi.string().required().min(3).max(50),
//         licenseNumber: Joi.string().optional(),
//         vehicle: Joi.string().optional(),
//         phoneNumber: Joi.string().regex(/^\d{10}$/).required(),
//         password: Joi.string().min(8).required(),
//         homeAddress: Joi.string().optional(),
//         // idPictureFront: Joi.string().optional(),
//         // idPictureBack: Joi.string().optional(),
//         // selfie: Joi.string().optional(),
//         workAddress: Joi.string().optional(),
        
        
//         // Assuming vehicle is provided as ID of an existing vehicle
//     });

//     // Validate the request body against the schema
//     const { error } = driverSchema.validate(req.body);

//     if (error) {
//         return res.status(400).json({ message: error.details[0].message });
//     }
//       // Hash the given password
//   const hashedPassword = await bcrypt.hash(password, 10);


//     // Create the driver
//     const driver = new Driver({
//         name,
//         phoneNumber,
//         password: hashedPassword,
//         idPictureFront,
//         idPictureBack,
//         selfie,
//         vehicle,
//         homeAddress, 
//         workAddress,
//         user: req.user.userId, // Assuming user ID is extracted from JWT payload
//     });

//     // Save the new driver to the database
//     await driver.save();
//     res.status(201).json(driver);
// });

// Update driver
const updateDriver = async (req, res) => {
    try {
        // Extract the user ID from the JWT payload
        const userId = req.user.userId;

        // Find the driver by ID and ensure that it belongs to the authenticated user
        let driver = await Driver.findOne({ _id: req.params.id, user: userId });

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        // Update the driver fields
        driver = await Driver.findOneAndUpdate(
            { _id: req.params.id, user: userId },
            { $set: req.body },
            { new: true }
        );

        res.json(driver);
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete driver
const deleteDriver = async (req, res) => {
    try {
        // Extract the user ID from the JWT payload
        const userId = req.user.userId;

        // Find and delete the driver by ID, ensuring it belongs to the authenticated user
        const deletedDriver = await Driver.findOneAndDelete({ _id: req.params.id, user: userId });

        if (!deletedDriver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.json({ message: 'Driver deleted successfully', deletedDriver });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    getAllDrivers,
    getDriverById,
   // createDriver,
    updateDriver,
    deleteDriver
};
