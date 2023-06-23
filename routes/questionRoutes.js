const express = require('express');
const questionController = require('../controllers/questionController');
const optionRoutes = require('./optionRoutes');

// Create a new router instance
const router = express.Router();

// Use the optionRoutes for any requests with a path that matches '/:id/options'
router.use('/:id/options', optionRoutes);

// Define routes for creating, getting, and deleting questions
router.route('/create').post(questionController.createQuestion);
router.route('/:id').get(questionController.getQuestion);
router.route('/:id/delete').delete(questionController.deleteQuestion);

module.exports = router;
