const Question = require('../models/questionModel');
const factory = require('./handlerFactory');

exports.getQuestion = factory.getOne(Question);
exports.createQuestion = factory.createOne(Question);
exports.deleteQuestion = factory.deleteOne(Question);
