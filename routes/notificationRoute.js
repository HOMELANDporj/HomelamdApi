const express= require("express");
const router =express.Router()
const { 
    viewUnreadNotifications,
    filterNotifications
   
 } = require("../controllers/notificationController");
const validateToken = require("../middleware/validateTokenHandler");

// Get current user profile
router.get('/unread', validateToken, viewUnreadNotifications);

// Endpoint to filter notifications based on criteria
router.get("/filter",validateToken, filterNotifications);


module.exports=router