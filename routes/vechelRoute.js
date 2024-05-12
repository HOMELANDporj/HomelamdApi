// vehicleRoutes.js

const express = require('express');
const multer = require("multer")
const path = require('path');
const router = express.Router();
const {
    // createVehicle,
     getMyVehicles,
     updateVehicle,
     assignDriverToVehicle,
     deleteVehicle
     } = require('../controllers/vechelontroller');
     
// Set up Multer storage
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, "images/vichelimages"); // Destination folder for storing uploaded files
     },
     filename: function (req, file, cb) {
       // Define how to name the uploaded files
       cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
     }
   });
   
   // Initialize multer middleware
   const upload = multer({
     storage: storage,
     limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
   });
const validateToken = require('../middleware/validateTokenHandler');

// POST /api/vehicles - Create a new vehicle
// router.post('/createVehicle ',upload.fields([
//      { name: 'librai', maxCount: 1 },
//    ]), validateToken, createVehicle);

// Route to retrieve all vehicles created by the current user
router.get('/getvehicles', validateToken, getMyVehicles);
// Route to update the details of a vehicle
router.put('/updatevehicles/:id', validateToken, updateVehicle);
// Assign driver to vehicle
router.put('/:vehicleId/assign-driver/:driverId', validateToken, assignDriverToVehicle);
router.delete('/deletevechel/:id', validateToken, deleteVehicle);

module.exports = router;
 