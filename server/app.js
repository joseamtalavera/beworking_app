

require('dotenv').config();

console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
console.log(process.env.REACT_APP_GOOGLE_CLIENT_SECRET);

// rest of your code...

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRoutes = require('./routers/authRoutes');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(cors()); // To allow cross-origin requests from the react client
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(authRoutes);

// Use express-session middleware for session management
app.use(session({
    secret: 'some random secret',
    resave: false,
    saveUninitialized: false
}));

// Initialize passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Configure passport to serialize users into and deserialize users out of the session
passport.serializeUser(function(user, done) {
    // This function is used to store the user object into the session
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    // This function is used to retrieve the user object from the session
    done(null, user);
});

// Configure passport to use GoogleStrategy
passport.use(new GoogleStrategy({
    clientID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
        // This function is called when a user successfully authenticates with Google
        // Its job is to resolve the user profile and call cb() with a user object
        // cb() is like a callback function
        console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
        return cb(null, profile);
    }
));

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});