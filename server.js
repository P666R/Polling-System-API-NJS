const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Load environment variables from config file
dotenv.config({ path: './config.env' });

// Import the main application
const app = require('./app');

// Construct the database connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Set the port number for the server
const port = process.env.PORT || 3000;

// Connect to the database and start the server
const connectAndStartServer = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Database connection successful');
  } catch (err) {
    console.log(err.name, err.message);
  }

  // Start the server after successful database connection
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  // Handle unhandled promise rejections
  const handleRejection = (err) => {
    console.log('Unhandled Rejection! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
  };

  process.on('unhandledRejection', handleRejection);

  process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully...');
    server.close(() => {
      console.log('Process terminated 💥');
    });
  });
};

// Start the server
connectAndStartServer();
