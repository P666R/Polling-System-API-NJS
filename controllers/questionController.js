const Question = require('../models/questionModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return next(new AppError('No question found with this id!', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      question,
    },
  });
});

exports.createQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      question,
    },
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findByIdAndDelete(req.params.id);

  if (!question) {
    return next(new AppError('No question found with this id!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
