const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  // Check for authorization header in either capitalization (Authorization or authorization)
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      // Extract token from "Bearer token" format
      token = authHeader.split(" ")[1];

      // Verify the token using JWT.verify
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

      // Attach the decoded user data to the request object
      req.user = decoded.user; // Assuming your payload contains a 'user' property

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle verification errors appropriately
      console.error(error);
      if (error.name === "JsonWebTokenError") {
        // Invalid token format or expired token
        res.status(401).json({ message: "Invalid or expired token" });
      } else if (error.name === "TokenExpiredError") {
        // Specifically handle expired token case
        res.status(401).json({ message: "Token expired. Please login again." });
      }  else if(error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Invalid signature" }); // Or a more generic message
    }
      else {
        // Other potential errors (e.g., signing secret mismatch)
        res.status(500).json({ message: "Server Error" });
      }
    }
  } else {
    // Handle missing or invalid authorization header
    res.status(401).json({ message: "No token provided. Authorization denied." });
  }
});

module.exports = validateToken;
