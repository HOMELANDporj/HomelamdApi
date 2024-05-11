const express= require("express")

const router =express.Router()
const multer = require("multer")
const path = require('path');

// ... rest of your code


// ... rest of your code


const{
   
    signin,
    currentUser,
    getAllUsers,
    getUserById,
    registerUser,
    updateUserProfile,
    deleteUser
}=require("../controllers/userController");

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/userimages"); // Destination folder for storing uploaded files
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
  
const validateToken = require("../middleware/validateTokenHandler");



router.route('/getallusers').get(getAllUsers)

router.route('/getuserbyid/:id').get(getUserById)

//router.route('/register').post(registerUser)
router.route("/register").post(upload.fields([
    { name: 'idPictureFront', maxCount: 1 },
    { name: 'idPictureBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]), registerUser);
router.route('/signin').post(signin)
router.route('/updateuser/:id').put(updateUserProfile)

router.route('/deleteuser/:id').delete(deleteUser)
router.get("/getCurrentUser",validateToken, currentUser)

 module.exports=router