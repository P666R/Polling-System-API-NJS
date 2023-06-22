const express = require('express');
const optionController = require('../controllers/optionController');

const router = express.Router({ mergeParams: true });

router.route('/create').post(optionController.createOption);
router.route('/:id/add_vote').post(optionController.addVoteOption);
router.route('/:id/delete').delete(optionController.deleteOption);

module.exports = router;
