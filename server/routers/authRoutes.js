const express = require('express');
const {body, validationResult} = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();
const jwt = require('jsonwebtoken');



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

router.get('/api/auth/status', (req, res) => {
    console.log('Checking auth status');
    const token = req.cookies.token;
    console.log('Token recieved:', token);
    if (!token) {
        console.log('No token found');
        
        return res.json({ isAuthenticated: false, isAdmin: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded);
        console.log('isAdmin:', decoded.isAdmin);
        return res.json({ isAuthenticated: true, isAdmin: decoded.isAdmin });
    } catch (error) {
        console.log('Error veirfying token:', error);
        return res.json({ isAuthenticated: false, isAdmin: false });
    }
});

module.exports = router;







