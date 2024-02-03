
// Load environment variables from the .env file
require('dotenv').config();


const express = require('express');
const passport = require('passport');
const authRoutes = require('./routers/authRoutes');
const session = require('express-session');
const cors = require('cors');

const app = express();


app.use(cors()); // To allow cross-origin requests from the react client
app.use(express.json()); // To parse the incoming requests with JSON payloads


// Use express-session middleware for session management.
// Sessions are a way to store information to a particular client (web browser) 
// for the duration of that client's visit.
app.use(session({
    secret: 'some random secret', // In a production app, this should be a large unguessable string, stored in an environment variable.
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
}));

app.use(authRoutes);

// Initialize passport and restore authentication state, if any, from the session.
// Passport middleware is a strategy invoked in every request that authenticates the request.
app.use(passport.initialize()); //
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


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/test', (req, res) => {
    res.send('Test route is working');
});


const port = process.env.PORT || 5005;
app.listen(port,'0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});