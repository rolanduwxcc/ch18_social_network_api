const router = require('express').Router();

const { createThought, getAllThoughts, getThoughtById, updateThought } = require('../../controllers/thought-controller');

router.route('/:userId').post(createThought);

router.route('/').get(getAllThoughts);

router.route('/:thoughtId').get(getThoughtById).put(updateThought);

module.exports = router;