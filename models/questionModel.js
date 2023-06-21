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
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
