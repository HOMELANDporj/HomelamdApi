const asyncHandler=require("express-async-handler")
const bcrypt = require("bcrypt")
const Joi = require("joi"); // Import Joi for validation
const User=require("../models/userModels")
//@desc crete  contact
//@route POST /api/contacts
//@access public
const createContacts = asyncHandler(async (req, res) => {
  console.log("The body requested to post is => ", req.body);

  const {
    name,
    phoneNumber,
    password,
    idPictureFront,
    idPictureBack,
    selfie,
    homeAddress,
    workAddress,
    emergencyContact,
  } = req.body;

  // Define Joi schema for validation
  const userSchema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    phoneNumber: Joi.string().regex(/^\d{10}$/).required(),
    password: Joi.string().min(8).required(),
    idPictureFront: Joi.string().optional(),
    idPictureBack: Joi.string().optional(),
    selfie: Joi.string().optional(),
    homeAddress: Joi.string().optional(),
    workAddress: Joi.string().optional(),
    emergencyContact: Joi.object({
      name: Joi.string().optional(),
      phoneNumber: Joi.string().regex(/^\d{10}$/).optional(),
    }).optional(),
  });

  // Validate the request body against the schema
  const { error } = userSchema.validate(req.body);

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
const getContacts = asyncHandler(async (req, res) => {
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
const getContact = asyncHandler(async (req, res) => {
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
const updateContact = asyncHandler(async (req, res) => {
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
const deleteContact = asyncHandler(async (req, res) => {
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

module.exports = {
    getContact,
    getContacts,
    createContacts,
    updateContact,
    deleteContact
}