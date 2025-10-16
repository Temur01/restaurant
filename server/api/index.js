// Vercel serverless function entry point
console.log('🚀 Loading Vercel serverless function...');

try {
  // Import the compiled Express app
  const server = require('../dist/server.js');
  const app = server.default || server;

  // Ensure the app is properly initialized
  if (!app) {
    console.error('❌ Failed to load Express app - app is null or undefined');
    throw new Error('Express app not properly exported');
  }

  if (typeof app !== 'function') {
    console.error('❌ Express app is not a function, type:', typeof app);
    throw new Error('Express app is not a valid Express instance');
  }

  console.log('✅ Express app loaded successfully');

  // Export the handler for Vercel serverless
  module.exports = app;
  module.exports.default = app;
} catch (error) {
  console.error('❌ Error loading serverless function:', error);
  
  // Fallback handler that returns the error
  module.exports = (req, res) => {
    res.status(500).json({
      error: 'Failed to load Express app',
      message: error.message,
      stack: error.stack
    });
  };
  module.exports.default = module.exports;
}

