const User = require('../models/User');
const Problem = require('../models/Problem');
const Answer = require('../models/Answer');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const problemCount = await Problem.countDocuments({ userId: req.user });
        const answers = await Answer.find({ userId: req.user });
        const answerCount = answers.length;

        // Total upvotes received on all their answers
        const totalUpvotes = answers.reduce((acc, ans) => acc + (ans.votes ? ans.votes.length : 0), 0);

        res.json({
            user,
            stats: {
                problemCount,
                answerCount,
                totalUpvotes
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
