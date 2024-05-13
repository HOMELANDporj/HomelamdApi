/**
 * Import necessary modules and controllers.
 * @param {import('express')} express - Express module for creating web applications.
 * @param {import("multer")} multer - Multer module for handling multipart/form-data.
 * @param {import('path')} path - Path module for working with file and directory paths.
 * @param {Object} carownerController - Object containing functions for handling car owner operations.
 */
const express = require('express');
const multer = require("multer");
const path = require('path');
const router = express.Router();
const {
    createCarOwner,
    getAllCarOwners,
    deleteCarOwner,
    updateCarOwner,
    signinCarOwner,
    createDriver,
    createVehicle

} = require('../controllers/carownerController');
/**
 * Set up Multer storage.
 * @param {import('express').Request} req - Express request object.
 * @param {import("multer").File} file - Multer file object.
 * @param {import('multer').Callback} cb - Multer callback function.
 * @returns {void} - No return value.
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/carownerimages"); // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
      // Define how to name the uploaded files
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
  });
  
/**
 * Initialize multer middleware.
 * @param {Object} options - Multer options object.
 * @returns {import("multer").Multer} - Multer middleware instance.
 */
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
  });

  /**
 * Validate token middleware.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * @returns {void} - No return value.
 */
const validateToken = require('../middleware/validateTokenHandler');

/**
 * Routes for handling car owner operations.
 * @param {import('express').Request} req - Express request object.
 * @param {import("multer").File} file - Multer file object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * @returns {void} - No return value.
 */
router.post('/createCarOwner',upload.fields([
    { name: 'idPictureFront', maxCount: 1 },
    { name: 'idPictureBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]),createCarOwner);


/**
 * Routes for handling driver registration operations.
 * @param {import('express').Request} req - Express request object.
 * @param {import("multer").File} file - Multer file object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * @returns {void} - No return value.
 */
  router.post('/registerdriver',upload.fields([
    { name: 'idPictureFront', maxCount: 1 },
    { name: 'idPictureBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]), validateToken,createDriver);

/**
 * Routes for handling vehicle registration operations.
 * @param {import('express').Request} req - Express request object.
 * @param {import("multer").File} file - Multer file object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * @returns {void} - No return value.
 */
  router.post('/createVehicle',upload.fields([
    { name: 'librai', maxCount: 1 },
    { name: 'carimg', maxCount: 1 }
  ]), validateToken, createVehicle);

/**
 * Routes for handling to  retrieves all car owners.
 * @param {import('express').Request} req - Express request object.
 * @param {import("multer").File} file - Multer file object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * @returns {void} - No return value.
 */
router.get('/getcarowner',validateToken,getAllCarOwners);
/**
 * Deletes a car owner by id.
 * @param {import('express').Request} req - Express request object containing the id of the car owner to be deleted.
 * @param {import("express").Response} res - Express response object to send the success or error message.
 * @param {import('express').NextFunction} next - Express next function to handle any errors that may occur during the deletion process.
 * @returns {void} - No return value. The success or error message is sent as a response to the client.
 */
router.delete('/deletecarowner/:id',validateToken,deleteCarOwner);
/**
 * Update a car owner's information.
 * @param {import('express').Request} req - Express request object containing the updated information for the car owner.
 * @param {import("express").Response} res - Express response object to send the updated car owner's information.
 * @param {import('express').NextFunction} next - Express next function to handle any errors that may occur during the update process.
 * @returns {void} - No return value. The updated car owner's information is sent as a response to the client.
 */
router.put('/updatecarowner/:id', validateToken,updateCarOwner );
/**
 * Routes for handling car owner sign in operations.
 * @param {import('express').Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * @returns {void} - No return value.
 */
router.post('/signincarowner',signinCarOwner );

module.exports = router;