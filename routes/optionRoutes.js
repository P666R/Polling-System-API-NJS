const express = require('express');

const router = express.Router({ mergeParams: true });

router.route('/create').post();
router.route('/:id/add_vote').post();
router.route('/:id/delete').delete();

module.exports = router;
