const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile } = require('../controllers/users');

router.get('/profile', auth, getProfile);

module.exports = router;
