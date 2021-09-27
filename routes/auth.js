const express = require('express');
const router = express.Router();

const { getAllUsers, loginUser, signUpUser } = require('../controllers/AuthController');

router.get('/', getAllUsers);

router.post('/signup', signUpUser);

router.post('/login', loginUser);

module.exports = router;