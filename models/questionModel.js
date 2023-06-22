const mongoose = require('mongoose');
const AppError = require('../utils/appError');

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Question is required'],
    },
  },
  {
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

questionSchema.virtual('options', {
  ref: 'Option',
  foreignField: 'question',
  localField: '_id',
});

questionSchema.pre('findOneAndDelete', async function (next) {
  const doc = await this.model.findOne(this.getQuery()).populate('options');

  if (
    doc.options.reduce((acc, option) => {
      return acc + option.vote;
    }, 0) > 0
  ) {
    return next(
      new AppError('Cannot delete question whose options have votes!', 400)
    );
  }
  next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
