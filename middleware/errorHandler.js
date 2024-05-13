const { constants } = require("../constants");

const phoneAlreadyInUseError = new Error('Phone number already registered');
phoneAlreadyInUseError.statusCode = 400; // Set custom status code
/**
 * Error handling middleware function.
 * @param {Error} err - The error object to be handled.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void} - No return value.
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log error for debugging
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
       /**
       * Handles validation errors.
       * @param {Error} err - The error object to be handled.
       * @param {Object} req - The request object.
       * @param {Object} res - The response object.
       * @param {Function} next - The next middleware function in the stack.
       * @returns {void} - No return value.
       */
      res.json({ title: "Validation Failed", message: err.message }); // Extract message from error object
      break;
    case constants.FORBIDDEN:
      /**
       * Handles forbidden errors.
       * @param {Error} err - The error object to be handled.
       * @param {Object} req - The request object.
       * @param {Object} res - The response object.
       * @param {Function} next - The next middleware function in the stack.
       * @returns {void} - No return value.
       */
      res.json({ title: "FORBIDDEN", message: err.message });
      break;
    case constants.UNAUTHORIZATION:
        /**
       * Handles unauthorized errors.
       * @param {Error} err - The error object to be handled.
       * @param {Object} req - The request object.
       * @param {Object} res - The response object.
       * @param {Function} next - The next middleware function in the stack.
       * @returns {void} - No return value.
       */
      res.json({ title: "UNAUTHORIZATION", message: err.message });
      break;
    case constants.SERVER_ERROR:
       /**
       * Handles server errors.
       * @param {Error} err - The error object to be handled.
       * @param {Object} req - The request object.
       * @param {Object} res - The response object.
       * @param {Function} next - The next middleware function in the stack.
       * @returns {void} - No return value.
       */
      res.json({ title: "SERVER_ERROR", message: "Internal Server Error" }); // Generic message for production
      break;
    case phoneAlreadyInUseError.statusCode: // Handle custom error object
    /**
       * Handles custom error object for phone already in use.
       * @param {Error} err - The error object to be handled.
       * @param {Object} req - The request object.
       * @param {Object} res - The response object.
       * @param {Function} next - The next middleware function in the stack.
       * @returns {void} - No return value.
       */
      res.json({ title: "Phone Already Registered", message: phoneAlreadyInUseError.message });
      break;
    default:
       /**
       * Handles unhandled errors.
       * @param {Error} err - The error object to be handled.
       * @param {Object} req - The request object.
       * @param {Object} res - The response object.
       * @param {Function} next - The next middleware function in the stack.
       * @returns {void} - No return value.
       */
      console.log("Unhandled error:", err); // Log unhandled errors
      res.json({ title: "Unknown Error", message: "An unexpected error occurred" }); // Generic message for client
  }
}

module.exports = errorHandler;
