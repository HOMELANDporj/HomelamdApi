const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

// Connect to the database
connectDb();

// Create an Express application
const app = express();

// Set the port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/Homeland/User", require("./routes/userRoutes"));
app.use("/Homeland/service", require("./routes/serviceRequestRout")); // Corrected typo
app.use("/Homeland/profile", require("./routes/profileRoute")); // Corrected typo

// Error handling middleware - must be defined last
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
