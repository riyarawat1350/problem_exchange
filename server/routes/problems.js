const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProblem, getProblems, getProblemById } = require('../controllers/problems');

router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', auth, createProblem);

module.exports = router;
