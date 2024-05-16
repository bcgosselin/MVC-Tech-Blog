const router = require('express').Router();

// const apiRoutes = require('./api');
const userRoutes = require('./userRoutes');
const homeRoutes = require('../homeRoutes')

router.use('/users', userRoutes);
router.use('/', homeRoutes)
// router.use('/api', apiRoutes);

module.exports = router;
