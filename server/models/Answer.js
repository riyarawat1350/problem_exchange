const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answerText: { type: String, required: true },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', answerSchema);
