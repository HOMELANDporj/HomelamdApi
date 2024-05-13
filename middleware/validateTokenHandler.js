const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


/**
 * @description This middleware function validates the JWT token and verifies its authenticity.
 * It extracts the token from the authorization header, verifies it using JWT.verify,
 * and attaches the decoded user data to req.user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a Promise that resolves when the token is successfully verified.
 * @throws {Error} - Throws an error if the token verification fails.
 */
const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  // Check for authorization header and extract token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      // Extract token from "Bearer token" format
      token = authHeader.split(" ")[1];

      // Verify the token using JWT.verify
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

      // Attach the decoded user data to req.user
      req.user = decoded.user; // Assuming 'user' property in decoded data

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle verification errors without stopping the server
      console.error(error);
      res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
  } else {
    // Handle missing authorization header without stopping the server
    res.status(401).json({ message: "Unauthorized. Missing authorization header." });
  }
});

module.exports = validateToken;


/**
 * @description This middleware function validates the JWT token and verifies its authenticity,
 * as well as checks if the user has the required role.
 * It extracts the token from the authorization header, verifies it using JWT.verify,
 * attaches the decoded user data to req.user, and checks if the user has the required role.
 * If the user does not have the required role, it returns a 403 Forbidden response.
 * @param {Array} roles - An array of roles that the user must have to access the route.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a Promise that resolves when the token is successfully verified and the user has the required role.
 * @throws {Error} - Throws an error if the token verification fails or the user does not have the required role.
 */
// const validateTokenAndRole = (roles) => asyncHandler(async (req, res, next) => {
//   let token;

//   // Check for authorization header and extract token
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     try {
//       // Extract token from "Bearer token" format
//       token = authHeader.split(" ")[1];

//       // Verify the token using JWT.verify
//       const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

//       // Attach the decoded user data to req.user
//       req.user = decoded.user; // Assuming 'user' property in decoded data

//       // Check if the user has the required role
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ message: "Forbidden. Insufficient role." });
//       }

//       // Continue to the next middleware or route handler
//       next();
//     } catch (error) {
//       // Handle verification errors without stopping the server
//       console.error(error);
//       res.status(401).json({ message: "Unauthorized. Invalid token." });
//     }
//   } else {
//     // Handle missing authorization header without stopping the server
//     res.status(401).json({ message: "Unauthorized. Missing authorization header." });
//   }
// });

// module.exports = validateTokenAndRole;




//****************************************************************************** */
// THIS IS THE ROUTE TO BE EDITED ON THE ROUTE FILE 


// const validateTokenAndRole = require("./validateTokenAndRole");

// // Example route protected for 'admin' role only
// app.get("/api/admin/dashboard", validateTokenAndRole(["admin"]), (req, res) => {
//   // Logic to handle admin dashboard
// });

// // Example route protected for 'user' role only
// app.get("/api/user/profile", validateTokenAndRole(["user"]), (req, res) => {
//   // Logic to handle user profile
// });

// // Example route protected for multiple roles
// app.get("/api/protected", validateTokenAndRole(["admin", "user"]), (req, res) => {
//   // Logic to handle route accessible to both 'admin' and 'user' roles
// });


/////*************************************************************************************** */