const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// Define a route for signing in with a token.
// Wher this route is hit, the loginWithGoogle function in the authController is called.
router.post('/token-signin', authController.loginWithGoogle);
router.post('/register', authController.registerEmail);


// Error handler middleware
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong', error: err.message });
});

module.exports = router;







