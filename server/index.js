// Vercel serverless function entry point
console.log('🚀 Loading Vercel serverless function...');

try {
  // Import the compiled Express app
  const server = require('./dist/server.js');
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

  // Wrap the app to add debugging
  const handler = (req, res) => {
    console.log(`📥 Request: ${req.method} ${req.url}`);
    console.log(`📍 Path: ${req.path || 'N/A'}`);
    console.log(`🔍 Headers:`, JSON.stringify(req.headers));
    return app(req, res);
  };

  // Export the handler for Vercel serverless
  module.exports = handler;
  module.exports.default = handler;
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

