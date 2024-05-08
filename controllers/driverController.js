// controllers/driverController.js

const Driver = require('../models/driverModel');

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


/// Create a new driver
const createDriver = async (req, res) => {
    try {
        // Extract the user ID from the JWT payload
        const userId = req.user.userId;

        // Create a new driver with the user ID
        const driver = new Driver({
            ...req.body,
            user: userId
        });

        // Save the new driver to the database
        await driver.save();

        res.status(201).json(driver);
    } catch (error) {
        console.error('Error creating driver:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
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
    createDriver,
    updateDriver,
    deleteDriver
};
