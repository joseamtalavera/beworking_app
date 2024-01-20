const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();

// Define routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // This function is called when a user successfully authenticates with Google
        // Its job is to redirect the user to the right place
        res.redirect('/dashboard');
    }
);
router.post('/token-signin', authController.loginWithGoogle);

module.exports = router;







