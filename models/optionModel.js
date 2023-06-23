const mongoose = require('mongoose');

// Define a new Mongoose schema for options
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
    vote: {
      type: Number,
      default: 0,
    },
    link_to_vote: String,
  },
  {
    strictQuery: true,
  }
);

// Create a new Mongoose model for options based on the optionSchema
const Option = mongoose.model('Option', optionSchema);

// Export the Option model for use in other files
module.exports = Option;
