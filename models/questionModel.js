const mongoose = require('mongoose');

// Define a new Mongoose schema for questions
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Question is required'],
    },
  },
  {
    strictQuery: true, // Ensure that only fields defined in the schema can be queried
    toJSON: { virtuals: true }, // Configure JSON serialization options
    toObject: { virtuals: true }, // Configure object serialization options
  }
);

// Define a virtual field
questionSchema.virtual('options', {
  ref: 'Option', // The name of the model to use for populating this field
  foreignField: 'question', // The name of the field on the Option model that references the parent Question model
  localField: '_id', // The name of the field on the Question model that is used to match against the foreignField
});

// Create a new Mongoose model for options based on the questionSchema
const Question = mongoose.model('Question', questionSchema);

// Export the Question model for use in other files
module.exports = Question;
