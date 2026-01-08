
const { Router } = require('express');
const { handleAddItems, handleFetchItems, handleFetchOneItem, handleUploadItem } = require('../controllers/itemContoller');
const { validateToken } = require('../utils/validateToken');


const router = Router()

// router.post("/add", handleAddItems);
router.get('/', handleFetchItems);
router.get('/:id', handleFetchOneItem);
router.post('/item/upload', validateToken, handleUploadItem);

module.exports = router;