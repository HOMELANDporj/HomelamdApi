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


//@desc crete  contact
//@route GET /api/contacts
//@access private
// serviceRequestController.js
const getAllServiceRequests = async (req, res) => {
  try {
      // Retrieve the user ID of the signed-in user from the request object
      const userId = req.user.userId;

      // Assuming you have a function to retrieve all service requests made by the user from the database
      const serviceRequests = await ServiceRequest.find({ user: userId });

      // Return the service requests
      res.status(200).json({ serviceRequests });
  } catch (error) {
      console.error('Error occurred while fetching service requests:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};

//@desc crete  contact
//@route PUT /api/contacts
//@access private
const updateServiceRequest = async (req, res) => {
  try {
      // Retrieve the ID of the service request from the request parameters
      const requestId = req.params.id;

      // Assuming you have a function to retrieve the service request from the database
      const serviceRequest = await ServiceRequest.findById(requestId);

      // Check if the service request exists
      if (!serviceRequest) {
          return res.status(404).json({ message: 'Service request not found' });
      }

      // Check if the status of the service request is "pending"
      if (serviceRequest.status !== 'pending') {
          return res.status(400).json({ message: 'Cannot update service request with status other than "pending"' });
      }

      // Check if the authenticated user is the owner of the service request
      if (serviceRequest.user.toString() !== req.user.userId) {
          return res.status(403).json({ message: 'Unauthorized to update this service request' });
      }

      // Update the service request (assuming req.body contains the updated data)
     
        // Update the service request with the data from the request body
        // Assuming req.body contains the updated data fields
        serviceRequest.pickupLocation = req.body.pickupLocation;
        serviceRequest.dropoffLocation = req.body.dropoffLocation;
        serviceRequest.pickupTime = req.body.pickupTime;

        // Save the updated service request to the database
        await serviceRequest.save();

        // Return success response

      // Return success response
      res.status(200).json({ message: 'Service request updated successfully' });
  } catch (error) {
      console.error('Error occurred while updating service request:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};

//@desc crete  contact
//@route PUT /api/contacts
//@access private
// serviceRequestController.js
const cancelServiceRequest = async (req, res) => {
  try {
      // Retrieve the ID of the service request from the request parameters
      const requestId = req.params.id;

      // Assuming you have a function to retrieve the service request from the database
      const serviceRequest = await ServiceRequest.findById(requestId);

      // Check if the service request exists
      if (!serviceRequest) {
          return res.status(404).json({ message: 'Service request not found' });
      }

      // Check if the status of the service request is "pending"
      if (serviceRequest.status !== 'pending') {
          return res.status(400).json({ message: 'Cannot cancel service request with status other than "pending"' });
      }

      // Check if the authenticated user is the owner of the service request
      if (serviceRequest.user.toString() !== req.user.userId) {
          return res.status(403).json({ message: 'Unauthorized to cancel this service request' });
      }

            // Update the status of the service request to "cancelled"
            serviceRequest.status = 'cancelled';

      // Save the updated service request to the database
      await serviceRequest.save();

      // Return success response
      res.status(200).json({ message: 'Service request cancelled successfully', cancelledServiceRequest: serviceRequest });
  } catch (error) {
      console.error('Error occurred while cancelling service request:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};





module.exports = {
    requestService,
    getAllServiceRequests,
    updateServiceRequest,
    cancelServiceRequest
}