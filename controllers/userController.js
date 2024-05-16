const asyncHandler=require("express-async-handler")
require('bcryptjs')
const Joi = require("joi"); // Import Joi for validation
const User=require("../models/userModels")
const jwt = require("jsonwebtoken");
const validateToken=require("../middleware/validateTokenHandler")


/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - The newly created user object
 */
const registerUser = asyncHandler(async (req, res) => {
  //console.log("The body requested to post is => ", req.body);
   //const { idPictureFrontId, idPictureBackId, selfieId } = req.files;
 
  const {
    name,
    phoneNumber,
    password,
    homeAddress, 
    workAddress,
    emergencyContact,
  } = req.body;
  const idPictureFront = req.files['idPictureFront'][0].filename;
  const idPictureBack = req.files['idPictureBack'][0].filename;
  const selfie = req.files['selfie'][0].filename;

  //const { idPictureFrontId, idPictureBackId, selfieId } = req.files; 
  // Define Joi schema for validation
  const userSchema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    phoneNumber: Joi.string().regex(/^\d{10}$/).required(),
    password: Joi.string().min(8).required(),
    // idPictureFront: Joi.string().optional(),
    // idPictureBack: Joi.string().optional(),
    // selfie: Joi.string().optional(),
    homeAddress: Joi.string().optional(),
    workAddress: Joi.string().optional(),
    emergencyContact: Joi.object({
      name: Joi.string().optional(),
      phoneNumber: Joi.string().regex(/^\d{10}$/).optional(),
    }).optional(),
  });

  // Validate the request body against the schema
  const { error } = userSchema.validate(req.body, { allowUnknown: true }); // Allow unknown fields

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if the phone number is already registered
  const userAvailable = await User.findOne({ phoneNumber });
  if (userAvailable) {
    return res.status(400).json({ message: "Phone number already registered. Please use a different phone number." });
  }

  // Hash the given password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({
    name,
    phoneNumber,
    password: hashedPassword,
    idPictureFront,
    idPictureBack,
    selfie,
    homeAddress,
    workAddress,
    emergencyContact,
  });

  res.status(201).json(user);
});



/**
 * Get all users
 * @route GET /api/contacts
 * @access public
 * @returns {Array} - An array of all users
 */
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
/**
 * Get all users
 * @route GET /api/contacts
 * @access public
 * @returns {Array} - An array of all users
 */
const getUserById = asyncHandler(async (req, res) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    id: Joi.string().alphanum().required(),
  });

  // Validate the request parameters against the schema
  const { error } = schema.validate({ id: req.params.id });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Find the user by ID, excluding the password field (security precaution)
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      // Handle not found case gracefully:
      return res.status(404).json({ message: `User with ID ${req.params.id} not found` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server Error' }); // Generic error for unexpected issues
  }
});

/**
 * Update a user's profile by ID.
 * @route PUT /api/contacts/:id
 * @access public
 * @param {Object} req - Express request object
 * @param {String} req.params.id - The ID of the user to update
 * @param {Object} req.body - The updated user information
 * @property {String} [req.body.name] - The updated user's name
 * @property {String} [req.body.phoneNumber] - The updated user's phone number
 * @property {String} [req.body.password] - The updated user's password
 * @property {String} [req.body.idPictureFront] - The updated user's ID picture front
 * @property {String} [req.body.idPictureBack] - The updated user's ID picture back
 * @property {String} [req.body.selfie] - The updated user's selfie
 * @property {String} [req.body.homeAddress] - The updated user's home address
 * @property {String} [req.body.workAddress] - The updated user's work address
 * @property {Object} [req.body.emergencyContact] - The updated user's emergency contact information
 * @property {String} [req.body.emergencyContact.name] - The updated user's emergency contact's name
 * @property {String} [req.body.emergencyContact.phoneNumber] - The updated user's emergency contact's phone number
 * @returns {Object} - The updated user object
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    phoneNumber: Joi.string().regex(/^\d{10}$/),
    password: Joi.string().min(8),
    idPictureFront: Joi.string(),
    idPictureBack: Joi.string(),
    selfie: Joi.string(),
    homeAddress: Joi.string(),
    workAddress: Joi.string(),
    emergencyContact: Joi.object({
      name: Joi.string(),
      phoneNumber: Joi.string().regex(/^\d{10}$/),
    })
  });

  // Validate the request body against the schema
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${req.params.id} not found` });
    }

    // Update the user with the request body, returning the updated user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) {
      // Handle potential update failure (e.g., validation errors)
      return res.status(500).json({ message: 'Failed to update user' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


/**
 * Delete a user by ID.
 * @route DELETE /api/contacts/:id
 * @access private
 * @param {String} req.params.id - The ID of the user to delete
 * @returns {Object} - A JSON object containing a success message if the user is successfully deleted, or an error message if the user is not found or if there is a server error.
 */
const deleteUser = asyncHandler(async (req, res) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    id: Joi.string().alphanum().required(),
  });

  // Validate the request parameters against the schema
  const { error } = schema.validate({ id: req.params.id });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${req.params.id} not found` });
    }

    // Delete the user and handle the result
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      // Handle potential deletion failure (e.g., database errors)
      return res.status(500).json({ message: 'Failed to delete user' });
    }

    res.status(200).json({ message: `User with ID ${req.params.id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * Sign in user
 * @route POST /api/users/signin
 * @access Public
 * @param {Object} req - Express request object
 * @param {String} req.body.phoneNumber - The phone number of the user to sign in
 * @param {String} req.body.password - The password of the user to sign in
 * @returns {Object} - A JSON object containing a success message and a JWT token if the user is successfully signed in, or an error message if the user is not found or if there is a server error.
 */
const signin = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Basic validation
  if (!phoneNumber || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      res.status(400).json({ message: "Invalid phone number" });
      return;
    }

    // Compare hashed password with the provided password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" }); // Use 401 for unauthorized access
      return;
    }

    // Generate JWT with 10 minutes expiration time (you can adjust expiresIn)
    const payload = {
      userId: user._id,
      name: user.name, // Include desired user data in payload
      phoneNumber: user.phoneNumber,
    };
   // console.log(user)
    const token = jwt.sign({
      user:{
        
          userId: user._id,
          name: user.name, // Include desired user data in payload
          phoneNumber: user.phoneNumber,
          homeAddress: user.homeAddress,
          phoneNumber: user.phoneNumber,
          workAddress: user.workAddress,
          emergencyContact: user.emergencyContact,
          idPictureFront: user.idPictureFront,
          idPictureBack: user.idPictureBack,
          selfie: user.selfie,
        
      },}, 
      process.env.TOKEN_SECRET, { expiresIn: "60m" });

    res.status(200).json({
      message: "Login successful",
      token,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    return // Consider more specific error handling
  }
});


/**
 * Get the current user.
 * @route POST /api/users/getCurrentUser
 * @access private
 * @param {Object} req - Express request object
 * @returns {Object} - The current user object
 */
const currentUser = asyncHandler(async (req, res) => {
  // Wait for req.user to be populated by validateToken middleware
 // await validateToken(req, res); 

  // Check if user object exists in req.user (populated by validateToken)
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized. Please login to access this resource." });
    return;
  }  //const { _id, name, phoneNumber } = req.user; // Access user data
  res.json(req.user);
});

module.exports = {
    getUserById,
    getAllUsers,
    registerUser,
    updateUserProfile,
    deleteUser,
    signin,
    currentUser
}