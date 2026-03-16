const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing connection to:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connection successful!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);
  });
