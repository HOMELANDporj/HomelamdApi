const Notification = require("../models/notificatioModel");

/**
 * Fetches all unread notifications for the authenticated user.
 * Accessible only to signed-in users.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
//@desc Fetches all unread notifications for the authenticated user.
//@route GET 
//@access private
const viewUnreadNotifications = async (req, res) => {
  try {
    // Retrieve the user ID from the request object
    const userId = req.user.userId;
    
    // Query the database for unread notifications specific to the user
    const unreadNotifications = await Notification.find({ user: userId, readStatus: false });

    // Send the unread notifications as the response
    res.status(200).json({ notifications: unreadNotifications });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching unread notifications:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



/**
 * Filters notifications based on criteria specified in query parameters.
 * Accessible only to signed-in users.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
//@desc  Filters notifications based on criteria specified in query parameters.
//@route GET 
//@access private
const filterNotifications = async (req, res) => {
    try {
      // Retrieve the user ID from the request object
      const userId = req.user.userId;
  
      // Extract query parameters for filtering
      const { type, date, sender } = req.query;
  
      // Construct the filter criteria
      const filter = { user: userId };
      if (type) filter.type = type;
      if (date) filter.date = date;
      if (sender) filter.sender = sender;
  
      // Query the database with the filter criteria
      const filteredNotifications = await Notification.find(filter);
  
      // Send the filtered notifications as the response
      res.status(200).json({ notifications: filteredNotifications });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error filtering notifications:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


// Controller function to count unread notifications for the authenticated user
//@desc Controller function to count unread notifications for the authenticated user
//@route GET 
//@access private
const countUnreadNotifications = async (req, res) => {
  try {
    // Extract user ID from the request object (assuming it's populated by the authentication middleware)
    const userId = req.user.userId;

    // Count unread notifications for the authenticated user
    const unreadNotificationCount = await Notification.countDocuments({
      user: userId,
      readStatus: false // Filter for unread notifications
    });

    // Return the count of unread notifications as a response
    res.status(200).json({ count: unreadNotificationCount });
  } catch (error) {
    console.error('Error counting unread notifications:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  viewUnreadNotifications,
  filterNotifications,
  countUnreadNotifications
};
