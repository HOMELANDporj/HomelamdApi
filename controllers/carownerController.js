
const CarOwner = require('../models/carownerModel');

// Create Car Owner
const createCarOwner = async (req, res) => {
    try {
      const { name, password, phoneNumber, address, city, country } = req.body;
      
      // Validate request data
      if (!name || !password || !phoneNumber || !address || !city || !country) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if the user is authorized
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Create car owner
      const carOwner = new CarOwner({ name, password, phoneNumber, address, city, country });
      await carOwner.save();
      res.status(201).json({ message: 'Car owner created successfully', carOwner });
    } catch (error) {
      console.error('Error creating car owner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
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