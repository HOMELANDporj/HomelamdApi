const asyncHandler=require("express-async-handler")
const bcrypt = require("bcrypt")
const Joi = require("joi"); // Import Joi for validation
const User=require("../models/userModels")
const jwt = require("jsonwebtoken");
const validateToken=require("../middleware/validateTokenHandler")
//@desc crete  contact
//@route POST /api/contacts
//@access public
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



//@desc Get contact
//@route GEt /api/contacts
//@access public
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//@desc Get contact by id 
//@route GEt /api/contacts/:id
//@access public
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


//@desc update contact by id 
//@route PUT /api/contacts/:id
//@access public
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
//@desc Delete contact by id 
//@route DELETE /api/contacts/:id
//@access public
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


//@desc Sign in user
//@route POST /api/users/signin
//@access Public

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


//@desc get current user
//@route POST /api/users/getCurrentUser
//@access private
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