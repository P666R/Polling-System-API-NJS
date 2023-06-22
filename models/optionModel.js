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

optionSchema.pre('save', function (next) {
  this.link_to_vote = `${this._req.protocol}://${this._req.get(
    'host'
  )}/api/v1/options/${this._id}/add_vote`;
  next();
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
