const express = require('express');
const {body, validationResult} = require('express-validator');
const { registerEmail, loginEmail, confirmEmail, resetPassword, sendResetEmail } = require('../controllers/authController');
const router = express.Router();
const jwt = require('jsonwebtoken');

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
    registerEmail);
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
    loginEmail);
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
    sendResetEmail)
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
    resetPassword);
router.get('/confirm/:confirmationToken', confirmEmail);




router.use((err, req, res, _next) => {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong', error: err.message });
});

router.get('/auth/status', (req, res) => {
    console.log('Checking auth status');
    console.log('Cookies:', req.cookies);
    const token = req.cookies.token;
    console.log('Token received:', token);

    if (!token) {
        console.log('No token found');
        const response = { isAuthenticated: false, isAdmin: false };
        console.log('Response:', response);
        return res.json(response);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const response = { isAuthenticated: true, isAdmin: decoded.isAdmin };
        console.log('Response:', response);
        return res.json(response);
    } catch (error) {
        console.log('Error verifying token:', error);
        const response = { isAuthenticated: false, isAdmin: false };
        console.log('Response:', response);
        return res.json(response);
    }
});

router.post('/auth/logout', (req, res) => {
    console.log('Logging out');
    res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0)
    })
    console.log('Token cleared');
    res.clearCookie('token').send({ message: 'Logged out successfully' });
});

module.exports = router;








