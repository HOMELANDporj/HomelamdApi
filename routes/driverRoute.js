// routes/driverRoutes.js

const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path');
const driverController = require('../controllers/driverController');



/**
 * Set up Multer storage.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} cb - Express next middleware function.
 * @returns {void} - No return value.
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/driverimages"); // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
      // Define how to name the uploaded files
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
  });
  
/**
 * Initialize multer middleware.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @returns {void} - No return value.
 */

  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
  });

/**
 * Import the validateToken middleware from '../middleware/validateTokenHandler'.
 * This middleware is used to validate the token in the request.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @returns {void} - No return value.
 */
const validateToken = require('../middleware/validateTokenHandler');

/**
 * Get all drivers
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 * @returns {void} - No return value
 */
router.get('/getdriver',validateToken, driverController.getAllDrivers);

/**
 * Get driver by ID
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 * @returns {void} - No return value
 */
router.get('/getdriverbyid/:id', validateToken, driverController.getDriverById);


/**
 * Update a driver (accessible only to the owner of the driver)
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 * @returns {void} - No return value
 */
router.put('/updatedriver/:id', validateToken, driverController.updateDriver);

/**
 * Delete a driver (accessible only to the owner of the driver)
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 * @returns {void} - No return value
 */
router.delete('/deletedriver/:id', validateToken, driverController.deleteDriver);
/**
 * Post request to sign in a driver.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @returns {void} - No return value.
 */
router.post('/signindriver',driverController.signinDriver );

module.exports = router;
 