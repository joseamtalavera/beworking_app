const express = require('express');
const {body, validationResult} = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();



//router.post('/token-signing', authController.loginWithGoogle);
router.post('/register', 
    [
        body('email').isEmail(),
        body('password')
            .isLength({min: 8})
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,}$/)
            .withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstErrorMessage = errors.array()[0].msg;
            return res.status(400).send({message: firstErrorMessage});
        }
        next();
    },
    authController.registerEmail);
router.post('/login', 
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').not().isEmpty().withMessage('Password is required')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstErrorMessage = errors.array()[0].msg;
            return res.status(400).send({message: firstErrorMessage});
        }
        next();
    },
    authController.loginEmail);
router.post('/recover', 
    [
        body('email').isEmail().withMessage('Please enter a valid email')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstErrorMessage = errors.array()[0].msg;
            console.log('Validadtion error:', firstErrorMessage);
            return res.status(400).send({message: firstErrorMessage});
        }
        next();
    },
    authController.sendResetEmail)
router.post('/resetEmail', 
    [
        body('password')
            .isLength({min: 8})
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,}$/)
            .withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character')
    
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstErrorMessage = errors.array()[0].msg;
            return res.status(400).send({message: firstErrorMessage});
        }
        next();
    },
    authController.resetPassword);
router.get('/confirm/:confirmationToken', authController.confirmEmail);




router.use((err, req, res) => {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong', error: err.message });
});

module.exports = router;







