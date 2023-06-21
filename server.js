const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception! 💥 Shutting down...');
  console.error(err.name, err.message);
  // exit the process
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Connect to the database
    await mongoose.connect(DB);
    console.log('Database connection successful');

    // Start the server
    app.listen(port, () => console.log(`App running on port ${port}...`));
  } catch ({ name, message }) {
    // Handle connection errors
    console.log(name, message);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! 💥 Shutting down...');
  console.log(err.name, err.message);
  // Close the server and exit the process
  server.close(() => process.exit(1));
});

start();
