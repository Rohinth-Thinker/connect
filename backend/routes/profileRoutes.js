

const { Router } = require('express');
const { handleGetSavedItemsID, handleUpdateSavedItems, handleEditProfile, handleGetUserProfile, handleFetchAllUserProfiles, handleFetchUserProfiles, handleGetSavedItems, handleGetUserItemListings, handleProfileImageChange } = require('../controllers/profileController');
const { validateToken } = require('../utils/validateToken');


const router = Router()

router.get('/savedItems', validateToken, handleGetSavedItems);
router.patch('/savedItemsID/update', validateToken, handleUpdateSavedItems);
router.patch('/edit', validateToken, handleEditProfile);
router.get('/:requestedUsername', validateToken, handleGetUserProfile);

router.get('/fetch/profiles/all', handleFetchAllUserProfiles);
router.get('/fetch/profiles', handleFetchUserProfiles);

router.get('/user/:userID/item/listings', validateToken, handleGetUserItemListings);

router.patch('/avatar/update', validateToken, handleProfileImageChange);

module.exports = router;