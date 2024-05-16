// Import required modules
const express = require('express');
const router = express.Router();

// Define route handler for the root route ("/")
router.get('/', (req, res) => {
    // Render the main.handlebars layout
    res.render('home');
});

// Define route handler for the root route ("/")
router.get('/login', (req, res) => {
  // Render the main.handlebars layout
  res.render('login');
});

// Export the router
module.exports = router;



// const router = require('express').Router();
// const { User } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//     try {
      
//       const userData = await User.findAll({
//         attributes: { exclude: ['password'] },
//         order: [['name', 'ASC']],
//       });
  
//       const users = userData.map((user) => user.get({ plain: true }));
  
//       res.render('home', {
//         users,
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('login');
//   });
  
//   module.exports = router;
  