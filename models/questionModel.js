const mongoose = require('mongoose');

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

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
