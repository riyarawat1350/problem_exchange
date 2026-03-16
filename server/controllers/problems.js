const Problem = require('../models/Problem');
const Answer = require('../models/Answer');

exports.createProblem = async (req, res) => {
    try {
        const { title, description, category, tags } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({ message: 'Title, description and category are required' });
        }

        const newProblem = new Problem({
            title,
            description,
            category,
            tags,
            userId: req.user
        });

        const savedProblem = await newProblem.save();
        res.json(savedProblem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProblems = async (req, res) => {
    try {
        const { search, category, tag, sort } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        if (tag) {
            query.tags = tag;
        }

        let sortOption = { createdAt: -1 };
        if (sort === 'oldest') sortOption = { createdAt: 1 };

        const problems = await Problem.find(query)
            .populate('userId', 'name')
            .sort(sortOption);

        // For each problem, get the answer count and total votes
        const problemsWithMeta = await Promise.all(problems.map(async (prob) => {
            const answerCount = await Answer.countDocuments({ problemId: prob._id });
            const answers = await Answer.find({ problemId: prob._id });
            const voteCount = answers.reduce((acc, ans) => acc + (ans.votes ? ans.votes.length : 0), 0);

            return {
                ...prob._doc,
                answerCount,
                voteCount
            };
        }));

        // Handle sorting that depends on calculated meta fields
        if (sort === 'popular') {
            problemsWithMeta.sort((a, b) => b.voteCount - a.voteCount);
        } else if (sort === 'most-answered') {
            problemsWithMeta.sort((a, b) => b.answerCount - a.answerCount);
        }

        res.json(problemsWithMeta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).populate('userId', 'name');
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const answerCount = await Answer.countDocuments({ problemId: problem._id });

        res.json({
            ...problem._doc,
            answerCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
