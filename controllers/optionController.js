const Option = require('../models/optionModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOption = catchAsync(async (req, res, next) => {
  const option = await Option.findByIdAndDelete(req.params.id);

  if (!option) {
    return next(new AppError('No option found with this id!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
