const Answer = require('../models/Answer');

exports.upvoteAnswer = async (req, res) => {
    try {
        const { answerId } = req.body;
        const userId = req.user;

        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        // Check if user already voted
        const index = answer.votes.indexOf(userId);
        if (index === -1) {
            // Add vote
            answer.votes.push(userId);
        } else {
            // Remove vote (toggle)
            answer.votes.splice(index, 1);
        }

        await answer.save();
        res.json({ votes: answer.votes.length, hasVoted: index === -1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
