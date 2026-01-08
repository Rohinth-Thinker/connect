
const { Router } = require('express');
const { handleGetUserConversations } = require('../controllers/chatController');
const { validateToken } = require('../utils/validateToken');

const router = Router()

router.get('/conversation/all', validateToken, handleGetUserConversations);

module.exports = router;