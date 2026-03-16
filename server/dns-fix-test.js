const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// Override Node.js DNS resolution to use Google and Cloudflare
// This often solves the querySrv ECONNREFUSED error on certain networks
dns.setServers(['8.8.8.8', '1.1.1.1', '4.2.2.2']);

const uri = process.env.MONGODB_URI;
console.log('Attempting connection with DNS override...');
console.log('URI:', uri);

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log('SUCCESS! DNS override worked. Connected to MongoDB Atlas.');
    process.exit(0);
  })
  .catch(err => {
    console.error('STILL FAILED:', err.message);
    if (err.message.includes('ECONNREFUSED')) {
        console.log('\n--- Recommendation ---');
        console.log('The network is still blocking SRV lookups.');
        console.log('I will now try to find the standard connection string format.');
    }
    process.exit(1);
  });
