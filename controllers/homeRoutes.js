// Import and create a router instance
const router = require('express').Router();

// Import the models (Post, User, Comment)
const { Post, User, Comment } = require('../models');

// Route to display the homepage with all posts and associated users and comments
router.get('/', async (req, res) => {
  try {
    // Find all posts with associated users and comments
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: [User]
        }
      ]
    });

    // Map the post data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage view with posts data
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // Send error response if an error occurs
    res.status(500).json(err);
  }
});

// Route to display a single post with associated user and comments
router.get('/post/:id', async (req, res) => {
  try {
    // Find a post by its id with associated user and comments
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: [User]
        }
      ]
    });

    // Convert post data to plain object
    const post = postData.get({ plain: true });

    // Render the post view with the post data
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // Send error response if an error occurs
    res.status(500).json(err);
  }
});

// Route to render the login form
router.get('/login', (req, res) => {
  // If user is logged in, redirect to homepage otherwise render login page
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// Route to render the signup form
router.get('/signup', (req, res) => {
  // If user is logged in, redirect to homepage otherwise render signup page
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
});

// Route to handle user signup
router.post('/signup', async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      // If the username already exists, send an error response
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user with the provided username and password
    const newUser = await User.create({ username, password });

    // Redirect the user to the dashboard
    res.redirect('/dashboard');
  } catch (error) {
    // If an error occurs send a 500 status code and the error message
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle user logout
router.get('/logout', (req, res) => {
  // Destroy the user session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }
    // Redirect the user to the homepage or login page
    res.redirect('/');
  });
});

// Route handler to render the form for creating a new post
router.get('/new', (req, res) => {
  // Render the new-post form view
  res.render('new-post');
});

// Route handler to handle the form submission for creating a new post
router.post('/new', async (req, res) => {
  try {
    const { title, content } = req.body;
    // Create a new post in the database
    const newPost = await Post.create({ title, content, user_id: req.session.user_id });
    // Redirect the user to dashboard route
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error creating new post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export
module.exports = router;