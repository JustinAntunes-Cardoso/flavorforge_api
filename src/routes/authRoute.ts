const router = require('express').Router();

const { loginUser, signUpUser } = require('../controllers/authController');

// Route for user login
router.post('/login', loginUser);

// Route for user signup
router.post('/signup', signUpUser);

module.exports = router;
