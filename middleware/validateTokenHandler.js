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
