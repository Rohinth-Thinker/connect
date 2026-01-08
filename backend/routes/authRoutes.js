
const { Router } = require('express');

const { healthCheck, handleSignup, handleLogin, handleLogout } = require('../controllers/authController');

const router = Router()

router.get('/health', healthCheck);
router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);

module.exports = router;