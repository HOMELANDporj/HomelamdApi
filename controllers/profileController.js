const Profile = require('../models/profileModel');
//@desc get current profile
//@route GET 
//@access private
// profileController.js
const getCurrentUserProfile = async (req, res) => {
    try {
        // Assuming you have a function to retrieve the user's profile based on their ID
        const userProfile = await Profile.findOne({ user: req.user.userId });

        if (!userProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ userProfile });
    } catch (error) {
        console.error('Error occurred while fetching user profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
// Function to update the current user's profile
// @desc update current profile
// @route PUT 
// @access private
// profileController.js
const updateProfile = async (req, res) => {
    try {
        // Extract the updated profile data from the request body
        const { fullName, address, organizationName, contactInformation, emergencyContact, phoneNumber } = req.body;

        // Find the current user's profile
        const userId = req.user.userId;
        const userProfile = await Profile.findOne({ user: userId });

        // If the user's profile is not found, return an error
        if (!userProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Update the profile fields with the new data
        userProfile.fullName = fullName || userProfile.fullName;
        userProfile.address = address || userProfile.address;
        userProfile.organizationName = organizationName || userProfile.organizationName;
        userProfile.contactInformation = contactInformation || userProfile.contactInformation;
        userProfile.emergencyContact = emergencyContact || userProfile.emergencyContact;
        userProfile.phoneNumber = phoneNumber || userProfile.phoneNumber;

        // Save the updated profile
        await userProfile.save();

        // Respond with a success message
        res.status(200).json({ message: 'Profile updated successfully', profile: userProfile });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Search for profiles based on phone number 
// it is query based on phone number like http://localhost:5001/Homeland/profile/search?phoneNumber=0902345678
// Function to search the any user's profile using phonenumber
// @desc search profile
// @route GET 
// @access private
const searchUserProfiles = async (req, res) => {
    try {
      const { phoneNumber } = req.query;
      if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required for search as query like http://localhost:5001/Homeland/profile/search?phoneNumber=0902345678' });
      }
      
      const profiles = await Profile.find({ phoneNumber });
      res.status(200).json(profiles);
    } catch (error) {
      console.error('Error searching user profiles:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


module.exports = {
    getCurrentUserProfile,
    updateProfile,
    searchUserProfiles
};
