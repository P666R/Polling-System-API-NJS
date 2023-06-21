const express = require('express');
const questionController = require('../controllers/questionController');
const optionRoutes = require('./optionRoutes');

const router = express.Router();

router.route('/:id/options', optionRoutes);

router.route('/create').post(questionController.createQuestion);
router.route('/:id').get(questionController.getQuestion);
router.route('/:id/delete').delete(questionController.deleteQuestion);

module.exports = router;
