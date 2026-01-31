
const { Router } = require('express');
const { handleGetUserConversations, handleAddMessage, handleCheckConversation, handleGetConversationWithMessages } = require('../controllers/chatController');
const { validateToken } = require('../utils/validateToken');

const router = Router()

router.get('/conversation/all', validateToken, handleGetUserConversations);
router.get('/conversation/:id', validateToken, handleGetConversationWithMessages);

router.post('/message/add', validateToken, handleAddMessage);

router.get('/conversation/check/:memberID', validateToken, handleCheckConversation);
// router.get('/messages/:conversationID')

module.exports = router;