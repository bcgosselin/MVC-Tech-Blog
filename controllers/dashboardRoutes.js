// Import and create a router instance
const router = require('express').Router();

// Import the Post model
const { Post } = require('../models');

// Import the withAuth middleware
const withAuth = require('../utils/auth');

// Route to display user's dashboard with their posts
router.get('/', withAuth, async (req, res) => {
  try {
    // Find all posts associated with the logged-in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      }
    });

    // Map the post data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard view with posts data
    res.render('dashboard', {
      posts,
      logged_in: true
    });
  } catch (err) {
    // Send error response if an error occurs
    res.status(500).json(err);
  }
});

// Route to create a new post
router.post('/new', withAuth, async (req, res) => {
  try {
    // Create a new post with data from request body and logged-in user's id
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Send success response with the new post data
    res.status(200).json(newPost);
  } catch (err) {
    // Send error response if creation fails
    res.status(400).json(err);
  }
});

// Route to edit a post
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    // Update the post with data from request body
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no post is updated, send error response
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Send success response with the updated post data
    res.status(200).json(updatedPost);
  } catch (err) {
    // Send error response if update fails
    res.status(500).json(err);
  }
});

// Route to delete a post
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    // Delete the post with the specified id and associated with the logged-in user
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no post is deleted, send error response
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Send success response
    res.status(200).json(postData);
  } catch (err) {
    // Send error response if deletion fails
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;