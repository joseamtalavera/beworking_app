const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();



//router.post('/token-signin', authController.loginWithGoogle);
router.post('/register', authController.registerEmail);
router.post('/login', authController.loginEmail);
router.post('/recover', authController.sendResetEmail)
router.post('/resetEmail', authController.resetPassword);
router.get('/confirm/:confirmationToken', authController.confirmEmail);




router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong', error: err.message });
});

module.exports = router;







