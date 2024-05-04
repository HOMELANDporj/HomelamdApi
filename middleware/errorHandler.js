const { constants } = require("../constants");

const phoneAlreadyInUseError = new Error('Phone number already registered');
phoneAlreadyInUseError.statusCode = 400; // Set custom status code

function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log error for debugging
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "Validation Failed", message: err.message }); // Extract message from error object
      break;
    case constants.FORBIDDEN:
      res.json({ title: "FORBIDDEN", message: err.message });
      break;
    case constants.UNAUTHORIZATION:
      res.json({ title: "UNAUTHORIZATION", message: err.message });
      break;
    case constants.SERVER_ERROR:
      res.json({ title: "SERVER_ERROR", message: "Internal Server Error" }); // Generic message for production
      break;
    case phoneAlreadyInUseError.statusCode: // Handle custom error object
      res.json({ title: "Phone Already Registered", message: phoneAlreadyInUseError.message });
      break;
    default:
      console.log("Unhandled error:", err); // Log unhandled errors
      res.json({ title: "Unknown Error", message: "An unexpected error occurred" }); // Generic message for client
  }
}

module.exports = errorHandler;
