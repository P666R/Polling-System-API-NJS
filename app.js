const express = require('express');
const questionRouter = require('./routes/questionRoutes');
const optionRouter = require('./routes/optionRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/options', optionRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
