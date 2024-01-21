const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

// Create a new router object
const router = express.Router();


// Define a route for signing in with a token.
// Wher this route is hit, the loginWithGoogle function in the authController is called.
router.post('/token-signin', authController.loginWithGoogle);


// Error handler middleware
router.use((err, req, res, next) => {
    res.status(500).send('Something went wrong');
});

module.exports = router;







