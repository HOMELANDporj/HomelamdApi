// vehicleRoutes.js

const express = require('express');
const router = express.Router();
const {
     createVehicle,
     getMyVehicles,
     updateVehicle,
     assignDriverToVehicle,
     deleteVehicle
     } = require('../controllers/vechelontroller');
const validateToken = require('../middleware/validateTokenHandler');

// POST /api/vehicles - Create a new vehicle
router.post('/createVehicle ', validateToken, createVehicle);

// Route to retrieve all vehicles created by the current user
router.get('/getvehicles', validateToken, getMyVehicles);
// Route to update the details of a vehicle
router.put('/updatevehicles/:id', validateToken, updateVehicle);
// Assign driver to vehicle
router.put('/:vehicleId/assign-driver/:driverId', validateToken, assignDriverToVehicle);
router.delete('/deletevechel/:id', validateToken, deleteVehicle);

module.exports = router;
