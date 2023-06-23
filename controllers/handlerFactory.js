const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Option = require('../models/optionModel');

const nameModel = (Model) => Model.modelName.toLowerCase();

/**
 * Middleware that gets a document by ID and populates its options field.
 * @param {Object} Model - a Mongoose model
 * @returns {Function} - an Express middleware function
 */
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).populate('options');
    if (!doc) {
      return next(
        new AppError(`No ${nameModel(Model)} found with this id!`, 404)
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        [nameModel(Model)]: doc,
      },
    });
  });

/**
 * Middleware that creates a new document.
 * If the model is an Option, it also creates a link_to_vote field based on the document ID
 * @param {Object} Model - a Mongoose model
 * @returns {Function} - an Express middleware function
 */
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc;
    if (nameModel(Model) === 'option') {
      doc = new Model({
        question: req.params.id,
        text: req.body.text,
      });
      doc.link_to_vote = `${req.protocol}://${req.get('host')}/api/v1/options/${
        doc._id
      }/add_vote`;
    } else {
      doc = new Model(req.body);
    }
    await doc.save();
    res.status(201).json({
      status: 'success',
      data: {
        [nameModel(Model)]: doc,
      },
    });
  });

/**
 * Middleware that deletes a document by ID.
 * If the model is a Question, it also deletes all associated options if no votes.
 * @param {Object} Model - a Mongoose model
 * @returns {Function} - an Express middleware function
 */
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const hasOptionsWithVotes =
      nameModel(Model) === 'question'
        ? await Option.exists({ question: req.params.id, vote: { $gt: 0 } })
        : await Option.exists({ vote: { $gt: 0 } });

    if (hasOptionsWithVotes) {
      const errorMessage =
        nameModel(Model) === 'question'
          ? `Cannot delete ${nameModel(Model)} whose options have votes!`
          : `Cannot delete ${nameModel(Model)} with votes!`;
      return next(new AppError(errorMessage, 400));
    }

    if (nameModel(Model) === 'question') {
      await Option.deleteMany({ question: req.params.id });
    }
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new AppError(`No ${nameModel(Model)} found with this id!`, 404)
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

/**
 * Middleware that increments the vote count of an option by 1.
 * @param {Object} Model - a Mongoose model
 * @returns {Function} - an Express middleware function
 */
exports.addVote = (Model) =>
  catchAsync(async (req, res, next) => {
    const update = {
      $inc: { vote: 1 },
    };
    const options = { new: true, runValidators: true };
    const doc = await Option.findByIdAndUpdate(req.params.id, update, options);
    res.status(201).json({
      status: 'success',
      data: { [nameModel(Model)]: doc },
    });
  });
