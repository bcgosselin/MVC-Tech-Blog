const router = require('express').Router();

// const apiRoutes = require('./api');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
// router.use('/api', apiRoutes);

module.exports = router;
