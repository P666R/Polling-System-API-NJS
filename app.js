// Importing necessary packages and modules
const express = require('express');
const questionRouter = require('./routes/questionRoutes');
const optionRouter = require('./routes/optionRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Creating an instance of the express application
const app = express();

// Parsing incoming JSON data
app.use(express.json());

// Routing for questions and options API endpoints
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/options', optionRouter);

// 404 error handling for all other API endpoints
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Exporting the express application
module.exports = app;
