const express = require('express');
const router = express.Router();

const { getAllUsers, loginUser, signUpUser, uploadProfileImg } = require('../controllers/AuthController');

router.get('/', getAllUsers);

router.post('/signup', signUpUser);

router.post('/login', loginUser);

//set profile img
router.post('/profileupload/:id', uploadProfileImg);

module.exports = router;