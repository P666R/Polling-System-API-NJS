const Question = require('../models/questionModel');
const factory = require('./handlerFactory');

// Retrieves a single question
exports.getQuestion = factory.getOne(Question);
// Creates a question
exports.createQuestion = factory.createOne(Question);
// Deletes a question
exports.deleteQuestion = factory.deleteOne(Question);
