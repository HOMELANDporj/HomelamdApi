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

      console.log('Decoded user1:', decoded); // Log for debugging

      // Attach the decoded user data to req.user
      req.user = decoded.user; // Assuming 'user' property in decoded data

      console.log('req.user1:', req.user); // Log for debugging after assignment

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle verification errors
      console.error(error);
      res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
  } else {
    // Handle missing authorization header
    res.status(401).json({ message: "Unauthorized. Missing authorization header." });
  }
});

module.exports = validateToken;
