const Option = require('../models/optionModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createOption = catchAsync(async (req, res, next) => {
  const option = new Option({
    question: req.params.id,
    text: req.body.text,
  });

  option._req = req;

  await option.save();

  res.status(201).json({
    status: 'success',
    data: {
      option,
    },
  });
});

exports.deleteOption = catchAsync(async (req, res, next) => {
  const option = await Option.findById(req.params.id);

  if (!option) {
    return next(new AppError('No option found with this id!', 404));
  }

  if (option.vote > 0) {
    return next(new AppError('Cannot delete option with votes!', 400));
  }

  await Option.deleteOne({ _id: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.addVoteOption = catchAsync(async (req, res, next) => {
  const option = await Option.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { vote: 1 },
    },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    status: 'success',
    data: {
      option,
    },
  });
});
