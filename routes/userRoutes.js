const express= require("express")

const router =express.Router()
const multer = require("multer")
const path = require('path');
const{
   
    signin,
    currentUser,
    getAllUsers,
   // getUserById,
    registerUser,
    updateUserProfile,
    deleteUser
}=require("../controllers/userController");

const { 
  requestService,
} = require("../controllers/serviceController");


/**
 * Set up Multer storage
 * @param {Object} req - Express request object
 * @param {Object} file - Multer file object
 * @param {Function} cb - Callback function to handle the destination and filename
 * @returns {void} - No return value
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./images/userimages"); // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
      // Define how to name the uploaded files
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
  });
  
/**
 * Initialize multer middleware
 * @param {Object} options - Multer options object
 * @returns {Function} - Multer middleware function
 */
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
  });

  /**
 * Import the validateToken middleware from the validateTokenHandler file.
 * This middleware is used to validate the token in the request.
 * @param {Object} options - Multer options object
 * @returns {Function} - Multer middleware function
 */
const validateToken = require("../middleware/validateTokenHandler");

 
//THIS ENDPIONTS ARE FOR ADMIN NOT FOR USERS
router.route('/getallusers').get(getAllUsers)

//router.route('/getuserbyid/:id').get(getUserById)



/**
 * Routes the POST request to the '/register' endpoint.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - No return value.
 */
router.route("/register").post(upload.fields([
    { name: 'idPictureFront', maxCount: 1 },
    { name: 'idPictureBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]), registerUser);

  /**
 * Routes the POST request to the '/signin' endpoint.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - No return value.
 */
router.route('/signin').post(signin)

/**
 * Updates a user's profile.
 * @param {Object} req - Express request object containing the user's updated information.
 * @param {String} req.body.name - The new name of the user.
 * @param {String} req.body.email - The new email of the user.
 * @param {String} req.body.phone - The new phone number of the user.
 * @param {String} req.body.address - The new address of the user.
 * @param {Number} req.params.id - The ID of the user to be updated.
 * @param {Function} res - Express response object to send the updated user information.
 * @param {Function} next - Express next middleware function to handle any errors.
 * @returns {void} - No return value.
 */
router.put('/updateuser/:id',validateToken,updateUserProfile)


/**
 * Deletes a user by id.
 * @param {Object} req - Express request object containing the user's id to be deleted.
 * @param {String} req.params.id - The ID of the user to be deleted.
 * @param {Object} res - Express response object to send the deletion confirmation.
 * @param {Function} next - Express next middleware function to handle any errors.
 * @returns {void} - No return value.
 */
router.delete('/deleteuser/:id',validateToken,deleteUser)


/**
 * Get the current user's information.
 * @param {Object} req - Express request object containing the user's id to be deleted.
 * @param {String} req.params.id - The ID of the user to get the information for.
 * @param {Object} res - Express response object to send the user's information.
 * @param {Function} next - Express next middleware function to handle any errors.
 * @returns {void} - No return value.
 */
router.get("/getCurrentUser",validateToken, currentUser)


/**
 * Routes the POST request to the '/requestService' endpoint.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - No return value.
 */
router.post('/requestService', validateToken, requestService);
 module.exports=router