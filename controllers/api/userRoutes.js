// Import and create a router instance
const router = require('express').Router();

// Import the User model
const { User } = require('../../models');

// Route to handle user signup
router.post('/signup', async (req, res) => {
  try {
    // Create a new user with the data from the request body
    const userData = await User.create(req.body);
    // Save user data to session and send response
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    // Send error response if signup fails
    res.status(400).json(err);
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    // Find user by username in the database
    const userData = await User.findOne({ where: { username: req.body.username } });

    // If user data not found send error response
    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Check if the password provided matches the stored password
    const validPassword = userData.checkPassword(req.body.password);

    // If password is invalid, send error response
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Save user data to session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Send error response if login fails
    res.status(400).json(err);
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  // If user is logged in, destroy session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If user is not logged in, send error response
    res.status(404).end();
  }
});

// Export
module.exports = router;