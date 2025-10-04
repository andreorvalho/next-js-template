const crypto = require('crypto');

// Generate a random 256-bit secret key (32 characters)
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);
