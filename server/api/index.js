// Vercel serverless function entry point
const server = require('../dist/server.js');
const app = server.default || server;

// Export for Vercel serverless
module.exports = app;
module.exports.default = app;

