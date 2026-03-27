
const { Router } = require('express')

const router = Router();

const authRoutes = require('./authRoutes');
const itemRoutes = require('./itemRoutes');
const profileRoutes = require('./profileRoutes');
const chatRoutes = require('./chatRoutes');

const driveRoutes = require('../classroom/routes/driveRoutes');

router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
router.use('/profile', profileRoutes);
router.use('/chat', chatRoutes);

router.use('/drive', driveRoutes);

module.exports = router;