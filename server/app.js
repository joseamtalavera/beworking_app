
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const authRoutes = require('./routers/authRoutes');

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/build')));

const port = process.env.PORT || 5005;

// use cors to allow cross origin resource sharing
const allowedOrigins = ['http://localhost:3003', 'https://emailcall.onrender.com', 'http://localhost:3000', 'https://main.drus08ferfq2w.amplifyapp.com/'];
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

app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);


// use express-session to maintain session data
app.use(session({
    secret: 'some random secret', // In a production app, this should be a large unguessable string, stored in an environment variable.
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
}));




app.use(passport.initialize()); // Initialize passport and restore authentication state, if any, from the session.
app.use(passport.session());


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