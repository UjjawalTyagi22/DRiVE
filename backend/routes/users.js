const express = require('express');
const router = express.Router();
const { updateProfile, getModuleStats } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/module-stats', getModuleStats);
router.put('/profile', protect, updateProfile);

module.exports = router;
