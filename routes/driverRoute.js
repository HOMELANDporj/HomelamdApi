// routes/driverRoutes.js

const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const validateToken = require('../middleware/validateTokenHandler');

// Get all drivers
router.get('/getdriver',validateToken, driverController.getAllDrivers);

// Get driver by ID
router.get('/getdriverbyid/:id', validateToken, driverController.getDriverById);

// Create a new driver (accessible only to authenticated users)
router.post('/registerdriver', validateToken, driverController.createDriver);

// Update a driver (accessible only to the owner of the driver)
router.put('/updatedriver/:id', validateToken, driverController.updateDriver);

// Delete a driver (accessible only to the owner of the driver)
router.delete('/deletedriver/:id', validateToken, driverController.deleteDriver);

module.exports = router;
