const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dns = require('dns');
require('dotenv').config();

// Bypass local DNS restrictions for MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '1.1.1.1']);

const User = require('./models/User');
const Problem = require('./models/Problem');
const Answer = require('./models/Answer');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/problemExchange';

const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Problem.deleteMany({});
        await Answer.deleteMany({});
        console.log('Cleared existing data.');

        // Create Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const users = await User.insertMany([
            { name: 'John Doe', email: 'john@example.com', password: hashedPassword },
            { name: 'Jane Smith', email: 'jane@example.com', password: hashedPassword },
            { name: 'Alex Wilson', email: 'alex@example.com', password: hashedPassword },
            { name: 'Sarah Chen', email: 'sarah@example.com', password: hashedPassword }
        ]);
        console.log('Users created.');

        // Create Problems
        const problems = await Problem.insertMany([
            {
                title: 'How to optimize React re-renders in large lists?',
                description: 'I have a list of 1000+ items and every time I update one item, the entire list re-renders. I tried using React.memo but it doesn\'t seem to help much. Any tips on using windowing or other techniques?',
                category: 'Coding',
                tags: ['react', 'performance', 'javascript'],
                userId: users[0]._id,
                createdAt: new Date(Date.now() - 86400000 * 2) // 2 days ago
            },
            {
                title: 'What are the best study habits for staying focused?',
                description: 'I find myself getting distracted every 10 minutes while studying for my finals. I tried the Pomodoro technique but it doesn\'t work for deep work. Looking for advice from people who have successfully navigated high-pressure exams.',
                category: 'Study',
                tags: ['productivity', 'focus', 'exams'],
                userId: users[1]._id,
                createdAt: new Date(Date.now() - 86400000 * 5) // 5 days ago
            },
            {
                title: 'Upgrading to WiFi 6: Is it worth it?',
                description: 'I still have an old WiFi 5 router but most of my new devices support WiFi 6. Will I see a significant difference in a small apartment with 4-5 connected devices?',
                category: 'Technology',
                tags: ['networking', 'wifi', 'hardware'],
                userId: users[2]._id,
                createdAt: new Date(Date.now() - 3600000 * 5) // 5 hours ago
            },
            {
                title: 'How to start a balcony garden in a cold climate?',
                description: 'I live in a zone 4 area and really want to grow some herbs and small vegetables on my balcony. What are some hardy plants that can survive a late frost?',
                category: 'Life',
                tags: ['gardening', 'hobbies', 'nature'],
                userId: users[3]._id,
                createdAt: new Date(Date.now() - 3600000 * 2) // 2 hours ago
            },
            {
                title: 'Understanding CSS Grid vs Flexbox',
                description: 'I often struggle to decide when to use CSS Grid and when to use Flexbox. Can someone explain the fundamental differences and provide some clear use cases for both?',
                category: 'Coding',
                tags: ['css', 'frontend', 'design'],
                userId: users[1]._id,
                createdAt: new Date(Date.now() - 86400000) // 1 day ago
            }
        ]);
        console.log('Problems created.');

        // Create Answers
        await Answer.insertMany([
            {
                problemId: problems[0]._id,
                userId: users[1]._id,
                answerText: 'You should definitely look into "react-window" or "react-virtualized". These libraries only render the items that are currently visible on the screen, which dramatically improves performance for large lists.',
                votes: [users[2]._id, users[3]._id]
            },
            {
                problemId: problems[0]._id,
                userId: users[2]._id,
                answerText: 'Also make sure you are not creating new object references in your props. Use useCallback for event handlers and useMemo for derived data.',
                votes: [users[1]._id]
            },
            {
                problemId: problems[1]._id,
                userId: users[3]._id,
                answerText: 'Try "Forest" app to stay off your phone. Also, environment matters - try a library or a dedicated quiet space where you only do one thing.',
                votes: [users[0]._id]
            },
            {
                problemId: problems[2]._id,
                userId: users[0]._id,
                answerText: 'In a small apartment with only 5 devices, you probably won\'t see a massive speed boost, but you will get better stability if there is a lot of interference from neighbors.',
                votes: []
            }
        ]);
        console.log('Answers created.');

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
