const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const nameModel = (Model) => Model.modelName.toLowerCase();

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

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc;
    if (nameModel(Model) === 'option') {
      doc = new Model({ question: req.params.id, text: req.body.text });
      doc._req = req;
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

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
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

exports.addVote = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { vote: 1 },
      },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      status: 'success',
      data: {
        [nameModel(Model)]: doc,
      },
    });
  });
