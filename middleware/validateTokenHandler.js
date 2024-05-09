const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

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

///***************************************************************************** */

//THIS CODE BELOW MAKES THE VALIDATE TOKEN TO BE 
//ROLE BASED ACCESS CONTROL


// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

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