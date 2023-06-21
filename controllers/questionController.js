const Question = require('../models/questionModel');

exports.getQuestion = async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  res.status(201).json({
    status: 'success',
    data: {
      question,
    },
  });
};

exports.createQuestion = async (req, res, next) => {
  const question = await Question.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      question,
    },
  });
};

exports.deleteQuestion = async (req, res, next) => {
  const question = await Question.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
