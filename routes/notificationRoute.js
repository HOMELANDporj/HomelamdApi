const express= require("express");
const router =express.Router()
const { 
    viewUnreadNotifications,
    filterNotifications,
    countUnreadNotifications
 } = require("../controllers/notificationController");
 /**
 * Import the validateToken middleware from "../middleware/validateTokenHandler".
 * This middleware is used to validate the token in the request.
 */
const validateToken = require("../middleware/validateTokenHandler");

/**
 * Get the unread notifications for the current user.
 *
 * @name getUnreadNotifications
 * @function
 * @memberof module:../controllers/notificationController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - This function does not return a value. It sends the unread notifications to the client.
 * @see module:../middleware/validateTokenHandler
 */
router.get('/unread', validateToken, viewUnreadNotifications);

/**
 * Endpoint to filter notifications based on criteria.
 *
 * @name filterNotifications
 * @function
 * @memberof module:../controllers/notificationController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - This function does not return a value. It sends the filtered notifications to the client.
 * @see module:../middleware/validateTokenHandler
 */
router.get("/filter",validateToken, filterNotifications);
/**
 * Endpoint to count the unread notifications for the current user.
 *
 * @name countUnreadNotifications
 * @function
 * @memberof module:../controllers/notificationController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - This function does not return a value. It sends the count of unread notifications to the client.
 * @see module:../middleware/validateTokenHandler
 */
router.get('/unread/count', validateToken, countUnreadNotifications)


module.exports=router