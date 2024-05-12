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

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/carownerimages"); // Destination folder for storing uploaded files
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

router.post('/createCarOwner',upload.fields([
    { name: 'idPictureFront', maxCount: 1 },
    { name: 'idPictureBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]),createCarOwner);


  router.post('/registerdriver',upload.fields([
    { name: 'idPictureFront', maxCount: 1 },
    { name: 'idPictureBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]), validateToken,createDriver);


  router.post('/createVehicle',upload.fields([
    { name: 'librai', maxCount: 1 },
    { name: 'carimg', maxCount: 1 }
  ]), validateToken, createVehicle);

router.get('/getcarowner',validateToken,getAllCarOwners);
router.delete('/deletecarowner/:id',validateToken,deleteCarOwner);
router.put('/updatecarowner/:id', validateToken,updateCarOwner );
router.post('/signincarowner',signinCarOwner );

module.exports = router;