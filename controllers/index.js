// Import the Express module and create a router instance
const router = require('express').Router();

// Import the route modules for different parts of the application
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

// Mount the route modules at their respective base paths
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

// Export
module.exports = router;