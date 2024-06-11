// Import Express and create a router instance
const router = require('express').Router();

// Import userRoutes
const userRoutes = require('./userRoutes');

// Mount at '/users' endpoint
router.use('/users', userRoutes);

// Export
module.exports = router;