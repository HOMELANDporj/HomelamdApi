const asyncHandler=require("express-async-handler")
const ServiceRequest = require('../models/serviceModel');


//@desc crete  contact
//@route POST /api/contacts
//@access private
const requestService = asyncHandler(async (req, res) => {
    try {
        // Extract necessary data from the request body
        const { pickupLocation, dropoffLocation, pickupTime } = req.body;
    
        // Validate request data (you can use a library like Joi for validation)
        if (!pickupLocation || !dropoffLocation || !pickupTime) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Assuming authentication middleware is used to verify user's identity and retrieve user's ID from the request object
        const userId = req.user.userId;
    
        // Create the service request
        const serviceRequest = new ServiceRequest({
          user: userId,
          pickupLocation,
          dropoffLocation,
          pickupTime
        });
    
        // Save the service request to the database
        await serviceRequest.save();
    
        // Optionally, you can perform additional actions such as sending notifications, etc.
    
        res.status(201).json({ message: 'Service request created successfully', serviceRequest });
      } catch (error) {
        console.error('Error occurred while creating service request:', error);
        res.status(500).json({ message: 'Server Error' });
      }


})

module.exports = {
    requestService
}