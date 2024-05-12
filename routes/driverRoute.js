// routes/driverRoutes.js

const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path');
const driverController = require('../controllers/driverController');


// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/driverimages"); // Destination folder for storing uploaded files
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

// Get all drivers
router.get('/getdriver',validateToken, driverController.getAllDrivers);

// Get driver by ID
router.get('/getdriverbyid/:id', validateToken, driverController.getDriverById);

// Create a new driver (accessible only to authenticated users)
// router.post('/registerdriver',upload.fields([
//     { name: 'idPictureFront', maxCount: 1 },
//     { name: 'idPictureBack', maxCount: 1 },
//     { name: 'selfie', maxCount: 1 }
//   ]), validateToken, driverController.createDriver);

// Update a driver (accessible only to the owner of the driver)
router.put('/updatedriver/:id', validateToken, driverController.updateDriver);

// Delete a driver (accessible only to the owner of the driver)
router.delete('/deletedriver/:id', validateToken, driverController.deleteDriver);

module.exports = router;
 