const express = require("express");
const router = express.Router();
const { 
    requestService,
    getAllServiceRequests,
    updateServiceRequest,
    cancelServiceRequest

 } = require("../controllers/serviceController");
 /**
 * Import the validateToken middleware from "../middleware/validateTokenHandler".
 * This middleware is used to validate the token in the request.
 */
const validateToken = require("../middleware/validateTokenHandler");

/**
 * POST request to create a service request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description This endpoint is used to create a new service request.
 * @returns {void} - No response is returned, the new service request is created and stored in the database.
 */
router.post('/requestService', validateToken, requestService);

/**
 * GET request to fetch all service requests made by the signed-in user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description This endpoint is used to fetch all service requests made by the signed-in user.
 * @returns {void} - No response is returned, the service requests are fetched and sent as a response in the body of the HTTP request.
 */
router.get('/getRequests', validateToken, getAllServiceRequests);

/**
 * PUT request to update a service request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description This endpoint is used to update a specific service request.
 * @returns {void} - No response is returned, the updated service request is stored in the database.
 */
router.put('/update/:id', validateToken, updateServiceRequest);



// Endpoint for cancelling a service request with a "pending" status
/**
 * @name cancelServiceRequest
 * @function
 * @memberof module:../controllers/serviceController
 * @summary This endpoint is used to cancel a specific service request with a "pending" status.
 * @param {Object} req - Express request object containing the request payload and headers.
 * @param {Object} res - Express response object used to send the HTTP response.
 * @param {Function} next - Express next middleware function to be called if the request is not handled by this endpoint.
 * @param {string} id - The unique identifier of the service request to be cancelled.
 * @returns {void} - No response is returned, the cancelled service request is stored in the database.
 */
router.put('/cancel/:id', validateToken, cancelServiceRequest);

module.exports = router;
