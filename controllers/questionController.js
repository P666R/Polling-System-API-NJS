const Question = require('../models/questionModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id).populate('options');

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
  const question = await Question.findById(req.params.id).populate('options');

  if (!question) {
    return next(new AppError('No question found with this id!', 404));
  }

  const totalVotes = question.options.reduce((acc, option) => {
    return acc + option.vote;
  }, 0);

  if (totalVotes > 0) {
    return next(
      new AppError('Cannot delete question whose options have votes!', 400)
    );
  }

  await Question.deleteOne({ _id: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
