const express= require("express");
const router =express.Router()
const { 
    getCurrentUserProfile,
    updateProfile,
    searchUserProfiles
 } = require("../controllers/profileController");
const validateToken = require("../middleware/validateTokenHandler");




// Get current user profile
router.get('/getProfile', validateToken, getCurrentUserProfile);
router.put('/updateProfile', validateToken, updateProfile);
// Search for profiles based on certain criteria
router.get('/search', searchUserProfiles);


module.exports=router