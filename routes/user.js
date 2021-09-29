const express = require('express');
const router = express.Router();
const { validateJwt } = require('../middlewares/processJwt');

const { getAllUsers, loginUser, signUpUser, uploadProfileImg } = require('../controllers/UserController');

router.get('/', getAllUsers);

router.post('/signup', signUpUser);

router.post('/login', loginUser);

//set profile img
router.post('/profileupload/:id', validateJwt, uploadProfileImg);

module.exports = router;