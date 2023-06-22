const express = require('express');
const questionRouter = require('./routes/questionRoutes');
const optionRouter = require('./routes/optionRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/options', optionRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
