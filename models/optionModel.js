const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Option is required'],
    },
    question: {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
    },
    vote: Number,
    link_to_vote: String,
  },
  {
    strictQuery: true,
  }
);

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
