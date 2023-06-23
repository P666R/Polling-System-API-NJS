const express = require('express');
const optionController = require('../controllers/optionController');

// Create a new router instance
const router = express.Router({ mergeParams: true });

// Define routes for creating, deleting options and adding votes to options
router.route('/create').post(optionController.createOption);
router.route('/:id/add_vote').post(optionController.addVoteOption);
router.route('/:id/delete').delete(optionController.deleteOption);

module.exports = router;
