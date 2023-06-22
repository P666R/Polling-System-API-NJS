const Option = require('../models/optionModel');
const factory = require('./handlerFactory');

exports.createOption = factory.createOne(Option);
exports.deleteOption = factory.deleteOne(Option);
exports.addVoteOption = factory.addVote(Option);
