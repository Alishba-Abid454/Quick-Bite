const app = require('./app');
const connectDB = require('./config/db');
const { PORT, NODE_ENV } = require('./config/env');

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();
    console.log('✅ Database connection established');

    // 2. Start Express server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    });

    // 3. Graceful shutdown handlers
    const shutdown = async () => {
      console.log('🛑 Shutting down server...');
      server.close(async () => {  
        console.log('✅ HTTP server closed');
        // Close MongoDB connection
        const mongoose = require('mongoose');
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed');
        process.exit(0);
      });
    };

    // Handle termination signals
    process.on('SIGTERM', shutdown); // Termination request
    process.on('SIGINT', shutdown); //Interrupt signal

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('❌ Unhandled Rejection:', err);
      shutdown();
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('❌ Uncaught Exception:', err);
      shutdown();
    });

    return server;
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Start the server
startServer();