const express= require("express");
const router =express.Router()
const { 
    getCurrentUserProfile,
    updateProfile,
    searchUserProfiles
 } = require("../controllers/profileController");
 /**
 * Import the validateToken middleware from "../middleware/validateTokenHandler".
 * This middleware is used to validate the token in the request.
 */
const validateToken = require("../middleware/validateTokenHandler");


/**
 * Get current user profile
 *
 * @name getCurrentUserProfile
 * @function
 * @memberof module:../controllers/profileController
 * @summary Returns the profile of the currently authenticated user.
 * @returns {Object} - The profile object of the current user.
 * @requires validateToken - Middleware to validate the token.
 * @example
 * // Usage
 * router.get('/getProfile', validateToken, getCurrentUserProfile);
 */
router.get('/getProfile', validateToken, getCurrentUserProfile);


/**
 * Update the profile of the currently authenticated user.
 *
 * @name updateProfile
 * @function
 * @memberof module:../controllers/profileController
 * @summary Updates the profile of the currently authenticated user.
 * @param {Object} req - The request object containing the updated profile data.
 * @param {Object} res - The response object to send the updated profile data.
 * @returns {void} - No return value. The updated profile data is sent in the response.
 * @requires validateToken - Middleware to validate the token.
 * @example
 * // Usage
 * router.put('/updateProfile', validateToken, updateProfile);
 */
router.put('/updateProfile', validateToken, updateProfile);


/**
 * Search for profiles based on certain criteria
 *
 * @name searchUserProfiles
 * @function
 * @memberof module:../controllers/profileController
 * @summary Searches for profiles based on certain criteria.
 * @param {Object} req - The request object containing the search criteria.
 * @param {Object} res - The response object to send the search results.
 * @returns {void} - No return value. The search results are sent in the response.
 * @requires validateToken - Middleware to validate the token.
 * @example
 * // Usage
 * router.get('/search', validateToken, searchUserProfiles);
 */
router.get('/search',validateToken, searchUserProfiles);


module.exports=router