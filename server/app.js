
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const authRoutes = require('./routers/authRoutes');
const userRoutes = require('./routers/userRoutes');

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cookieParser());

const port = process.env.PORT || 5005;

const allowedOrigins = ['http://localhost:3003', 'http://localhost:3000', 'https://be-working.com/'];
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(session({ // use express-session to maintain session data
    secret: 'some random secret', 
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize()); // Initialize passport and restore authentication state, if any, from the session.
app.use(passport.session());

// Initialize CSRF protection middleware
const csrfProtection = csrf();
app.use(csrfProtection);

app.use((req, res, next) => {
    req.session.csrfToken = req.csrfToken();
    next();
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN'){
        console.error('Invalid CSRF token detected');
        console.log('Cookies:', req.cookies);
        console.log('Headers:', req.headers);
        console.log('CSRF Token from Session:', req.session.csrfToken);
        console.log('CSRF Token from Header:', req.get('csrf-token'));
        res.status(403).send({message: 'CSRF token is invalid'});
    } else {
       next(); 
    }
});


passport.serializeUser(function(user, done) {// This function is used to store the user object into the session
    done(null, user);
});
passport.deserializeUser(function(user, done) {// This function is used to retrieve the user object from the session
    done(null, user);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
  });

  