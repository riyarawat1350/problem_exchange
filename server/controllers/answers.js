const Answer = require('../models/Answer');

exports.createAnswer = async (req, res) => {
    try {
        const { problemId, answerText } = req.body;

        if (!problemId || !answerText) {
            return res.status(400).json({ message: 'Problem ID and answer text are required' });
        }

        const newAnswer = new Answer({
            problemId,
            userId: req.user,
            answerText,
            votes: []
        });

        const savedAnswer = await newAnswer.save();
        res.json(savedAnswer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAnswersByProblem = async (req, res) => {
    try {
        const answers = await Answer.find({ problemId: req.params.problemId })
            .populate('userId', 'name')
            .sort({ 'votes.length': -1, createdAt: -1 }); // Sort by votes desc, then date

        res.json(answers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
