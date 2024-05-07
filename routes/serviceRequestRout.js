const express = require("express");
const router = express.Router();
const { 
    requestService,
    getAllServiceRequests,
    updateServiceRequest,
    cancelServiceRequest

 } = require("../controllers/serviceController");
const validateToken = require("../middleware/validateTokenHandler");

// POST request to create a service request
router.post('/requestService', validateToken, requestService);

// Endpoint for fetching all service requests made by the signed-in user
router.get('/getRequests', validateToken, getAllServiceRequests);
// Endpoint for updating a service request with a "pending" status
router.put('/update/:id', validateToken, updateServiceRequest);
// Endpoint for cancelling a service request with a "pending" status
router.put('/cancel/:id', validateToken, cancelServiceRequest);

module.exports = router;
