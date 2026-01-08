

const { Router } = require('express');
const { handleGetSavedItems, handleUpdateSavedItems, handleEditProfile, handleGetUserProfile } = require('../controllers/profileController');
const { validateToken } = require('../utils/validateToken');


const router = Router()

router.get('/savedItems', validateToken, handleGetSavedItems)
router.patch('/savedItems/update', validateToken, handleUpdateSavedItems);
router.patch('/edit', validateToken, handleEditProfile);
router.get('/:requestedUsername', validateToken, handleGetUserProfile);

module.exports = router;