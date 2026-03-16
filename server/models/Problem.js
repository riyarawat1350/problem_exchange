const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Study', 'Coding', 'Technology', 'Life', 'Other']
    },
    tags: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);
