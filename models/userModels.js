const mongoose = require("mongoose");
const Profile= require("./profileModel")

/**
 * User schema definition for MongoDB using Mongoose.
 * @param {mongoose} mongoose - Mongoose instance for schema definition.
 * @returns {mongoose.Schema} - User schema object.
 */
const userSchema = mongoose.Schema({
    /**
   * User's full name.
   * @type {String}
   * @required - True, indicating that the field is mandatory.
   * @minlength - Minimum length of the name.
   * @maxlength - Maximum length of the name.
   */
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
    maxlength: 50,
  },
  /**
   * User's phone number.
   * @type {String}
   * @required - True, indicating that the field is mandatory.
   * @unique - Ensures unique phone numbers.
   */
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true, // Ensures unique phone numbers
  },
    /**
   * User's password.
   * @type {String}
   * @required - True, indicating that the field is mandatory.
   */
  password: {
    type: String,
    required: [true, "Password is required"],
  },
    /**
   * User's ID picture front.
   * @type {String}
   * @required - True, indicating that the field is mandatory.
   */
  idPictureFront: {
    type:String,
    required: [true, "Id picture front is required"],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
  },
  /**
   * User's ID picture back.
   * @type {String}
   * @required - True, indicating that the field is mandatory.
   */
  idPictureBack: {
    type:String,
    required: [true, "Id picture back is required"],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
  },
   /**
   * User's selfie.
   * @type {String}
   * @required - True, indicating that the field is mandatory.
   */
  selfie: {
    type:String,
    required: [true, "Selfie is required"],
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Image',
  },
  /**
   * User's home address.
   * @type {String}
   * @optional - False, indicating that the field is optional.
   */
  homeAddress: {
    type: String,
    // required: [true, "Home address is required"] // Optional, uncomment if needed
  },
  workAddress: {
    type: String,
    // required: [true, "Work address is required"] // Optional, uncomment if needed
    },
  emergencyContact: {
    name: String,
    phoneNumber: String,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
    /**
   * User's role.
   * @type {String}
   * @enum - ['user', 'admin', 'moderator'] - Allowed values for the role field.
   * @default - 'user' - Default value for the role field.
   */
  role: {
    type: String,
    enum: ['user',],
    default: 'user',
  },
  /**
   * Array of references to the user's service requests.
   * @type {mongoose.Schema.Types.ObjectId[]}
   * @ref - 'ServiceRequest' - The associated service request model.
   */
  serviceRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceRequest'
  }],
    /**
   * Array of references to the user's notifications.
   * @type {mongoose.Schema.Types.ObjectId[]}
   * @ref - 'Notification' - The associated notification model.
   */
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification'
  }]

}, { timestamps: true });

/**
 * Middleware to create profile for a new user.
 * @param {mongoose.Document} next - Mongoose middleware callback function.
 */
userSchema.pre('save', async function(next) {
  try {
    // Only create profile if it doesn't already exist
    if (!this.profile) {
      // Create a new profile
      const newProfile = new Profile({
        user: this._id,
        fullName: this.name,
        address: this.homeAddress,
        organizationName: this.organizationName,
        contactInformation: this.contactInformation,
        emergencyContact: this.emergencyContact,
        phoneNumber: this.phoneNumber
        // Add other profile fields here
      });
      // Save the profile
      await newProfile.save();
      // Set the profile reference in the user document
      this.profile = newProfile._id;
    }
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Exports the user schema as a Mongoose model.
 * @type {mongoose.Model}
 * @param {String} name - Name of the Mongoose model.
 */
module.exports = mongoose.model("User", userSchema);
