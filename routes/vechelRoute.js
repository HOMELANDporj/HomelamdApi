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
     
/**
 * Sets up the Multer storage configuration.
 * @param {Object} req - Express request object.
 * @param {Object} file - Multer file object.
 * @param {Function} cb - Callback function to handle the destination and filename.
 * @returns {void} - No return value.
 */
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, "images/vichelimages"); // Destination folder for storing uploaded files
     },
     filename: function (req, file, cb) {
       // Define how to name the uploaded files
       cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
     }
   });
   
/**
 * Initializes the Multer middleware with the specified options.
 * @param {Object} options - Multer options object.
 * @returns {Function} - Multer middleware function.
 */
   const upload = multer({
     storage: storage,
     limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
   });

   /**
 * Import the validateToken middleware from "../middleware/validateTokenHandler".
 * This middleware is used to validate the token in the request.
 */
const validateToken = require('../middleware/validateTokenHandler');


/**
 * Route to retrieve all vehicles created by the current user
 * @name getMyVehicles
 * @function
 * @memberof module:vehicleRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} - No return value
 */
router.get('/getvehicles', validateToken, getMyVehicles);


/**
 * Route to update the details of a vehicle
 * @name updateVehicle
 * @function
 * @memberof module:vehicleRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} - No return value
 */
router.put('/updatevehicles/:id', validateToken, updateVehicle);


/**
 * Route to assign a driver to a vehicle
 * @name assignDriverToVehicle
 * @function
 * @memberof module:vehicleRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} req.params.vehicleId - The ID of the vehicle to assign a driver to
 * @param {string} req.params.driverId - The ID of the driver to assign to the vehicle
 * @returns {void} - No return value
 */
router.put('/:vehicleId/assign-driver/:driverId', validateToken, assignDriverToVehicle);


/**
 * Route to delete a vehicle
 * @name deleteVehicle
 * @function
 * @memberof module:vehicleRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} req.params.id - The ID of the vehicle to delete
 * @returns {void} - No return value
 */
router.delete('/deletevechel/:id', validateToken, deleteVehicle);

module.exports = router;




















// POST /api/vehicles - Create a new vehicle
// router.post('/createVehicle ',upload.fields([
//      { name: 'librai', maxCount: 1 },
//    ]), validateToken, createVehicle);