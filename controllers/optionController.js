const Option = require('../models/optionModel');
const factory = require('./handlerFactory');

// Creates a option
exports.createOption = factory.createOne(Option);
// Deletes a question
exports.deleteOption = factory.deleteOne(Option);
// Adds a vote to an option
exports.addVoteOption = factory.addVote(Option);
