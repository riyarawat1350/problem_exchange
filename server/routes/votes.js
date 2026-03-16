const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upvoteAnswer } = require('../controllers/votes');

router.post('/', auth, upvoteAnswer);

module.exports = router;
