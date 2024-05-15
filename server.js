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
app.get('/', (req, res) => {
  res.send('Welcome!');
});
// Routes
app.use("/Homeland/User", require("./routes/userRoutes"));
app.use("/Homeland/service", require("./routes/serviceRequestRout")); // Corrected typo
app.use("/Homeland/profile", require("./routes/profileRoute")); // Corrected typo
app.use("/Homeland/notification", require("./routes/notificationRoute")); // Corrected typo
app.use("/Homeland/driver", require("./routes/driverRoute")); // Corrected typo
app.use("/Homeland/vechel", require("./routes/vechelRoute")); // Corrected typo
app.use("/Homeland/carowners", require("./routes/carownerRoute")); // Corrected typo

// Error handling middleware - must be defined last
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Export the Express API
module.exports = app;