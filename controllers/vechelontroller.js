// vehicleController.js

const Vehicle = require('../models/vechelModel');
const Joi = require('joi');


// Define Joi schema for vehicle creation
const vehicleSchema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  licensePlate: Joi.string().required(),
  //librai: Joi.string().required(), // Assuming 'librai' is the filename
});

const createVehicle = async (req, res) => {
  try {
    // Validate request body against schema
    const { error } = vehicleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Extract necessary data from the request body
    const { make, model, year, licensePlate } = req.body;
    const librai = req.files['librai'][0].filename;

    // Assuming the authenticated user's ID is available in the request object
    const userId = req.user.userId;

    // Create a new vehicle instance
    const vehicle = new Vehicle({
      make,
      model, 
      year,
      licensePlate,
      librai,
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

// Function to retrieve all vehicles created by the current user
const getMyVehicles = async (req, res) => {
    try {
      // Assuming the authenticated user's ID is available in the request object
      const userId = req.user.userId;
  
      // Find all vehicles owned by the current user
      const vehicles = await Vehicle.find({ owner: userId });
  
      // Return the list of vehicles
      res.status(200).json({ vehicles });
    } catch (error) {
      console.error('Error retrieving vehicles:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  
// Function to update the details of a vehicle
const updateVehicle = async (req, res) => {
    try {
      // Retrieve the ID of the vehicle from the request parameters
      const vehicleId = req.params.id;
  
      // Find the vehicle by ID
      let vehicle = await Vehicle.findById(vehicleId);
  
      // Check if the vehicle exists
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      // Assuming only the vehicle owner can update the details
      if (vehicle.owner.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized to update this vehicle' });
      }
  
      // Update the vehicle details with the data from the request body
      vehicle = await Vehicle.findByIdAndUpdate(vehicleId, req.body, { new: true });
  
      // Return the updated vehicle
      res.status(200).json({ vehicle });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
 
const assignDriverToVehicle = async (req, res) => {
    try {
      // Extract vehicle ID and driver ID from request parameters
      const { vehicleId, driverId } = req.params;
  
      // Check if both vehicle ID and driver ID are provided
      if (!vehicleId || !driverId) {
        return res.status(400).json({ message: 'Vehicle ID and Driver ID are required' });
      }
  
      // Find the vehicle by ID
      const vehicle = await Vehicle.findById(vehicleId);
  
      // Check if the vehicle exists
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      // Find the driver by ID
      const driver = await Driver.findById(driverId);
  
      // Check if the driver exists
      if (!driver) {
        return res.status(404).json({ message: 'Driver not found' });
      }
  
      // Assign the driver to the vehicle
      vehicle.driver = driverId;
  
      // Save the updated vehicle
      await vehicle.save();
  
      // Return success response
      res.status(200).json({ message: 'Driver assigned to vehicle successfully', vehicle });
    } catch (error) {
      console.error('Error assigning driver to vehicle:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


  const deleteVehicle = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the vehicle by ID and delete it
      const deletedVehicle = await Vehicle.findByIdAndDelete(id);
  
      if (!deletedVehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
module.exports = {
  createVehicle,
  getMyVehicles,
  updateVehicle,
  assignDriverToVehicle,
  deleteVehicle
};
