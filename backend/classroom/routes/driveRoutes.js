const { Router } = require('express');
const { 
    createFolder, 
    getDriveContent, 
    saveFileMetadata, 
    deleteFile, 
    deleteFolder 
} = require('../controllers/driveController');
const { validateToken } = require('../../utils/validateToken');

const router = Router();

// Apply auth middleware to all drive routes
router.use(validateToken);

router.get('/', getDriveContent);
router.post('/folder', createFolder);
router.post('/file', saveFileMetadata);
router.delete('/file/:id', deleteFile);
router.delete('/folder/:id', deleteFolder);

module.exports = router;