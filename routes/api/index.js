const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
const reactionRoutes = require('./reactionRoutes');

// router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes, friendRoutes);
router.use('/thoughts', thoughtRoutes, reactionRoutes);

module.exports = router;