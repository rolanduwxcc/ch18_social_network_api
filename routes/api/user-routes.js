const router = require('express').Router();

const { createUser, getAllUsers, getUserById, updateUser } = require('../../controllers/user-controller');


router.route('/')
    .post(createUser)
    .get(getAllUsers);


router.route('/:userId')
    .get(getUserById)
    .put(updateUser);

    
    module.exports = router;