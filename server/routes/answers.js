const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAnswer, getAnswersByProblem } = require('../controllers/answers');

router.get('/:problemId', getAnswersByProblem);
router.post('/', auth, createAnswer);

module.exports = router;
