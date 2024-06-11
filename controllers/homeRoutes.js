const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
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

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
});

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
      // If an error occurs, send a 500 status code and the error message
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Define the logout route
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
  res.render('new-post');
});

// Route handler to handle the form submission for creating a new post
router.post('/new', async (req, res) => {
  try {
    const { title, content } = req.body;
    // Create a new post in the database
    const newPost = await Post.create({ title, content, user_id: req.session.user_id });
    // Redirect the user to a relevant page, e.g., the dashboard or the newly created post
    res.redirect('/dashboard'); // Assuming you have a route set up for the dashboard
  } catch (error) {
    console.error('Error creating new post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

