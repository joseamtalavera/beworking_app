const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const {createUser} = require('../model/queries');
const { getUserByEmail } = require('../model/queries');
const bcrypt = require('bcrypt');



async function verify(token){
    console.log("Google Client ID (audience):", process.env.GOOGLE_CLIENT_ID); // Log the Google Client ID

    // This method is asynchronous and returns a Promise that resolves to the ticket.
    const ticket = await client.verifyIdToken({ // This method verifies the ID token and returns the decoded token payload.
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload(); // Extract the payload from the ticket. This is ID token payload.
    const userid = payload['sub']; // It stands for Subject. It is a unique identifier for the user. It is a claim in the JWT.
    return userid; // Return the User ID. The user ID can be used to identify the user in the database.
 
}


exports.loginWithGoogle = async (req, res) => {

    const {token} = req.body; // Get the token from the request body of the HTTP POST request.
    
    try {
        // if the token is valid, we can send the user data to frontend. 
        //And the user can be created in the database and the user login was successful.
        console.log('Verifying token:', token);
        const userid = await verify(token);
        console.log('Verified user id:', userid);
        
        // Create a new user in the database if the user doesn't exist.
        console.log('Creating user for id:', userid);
        const user = await createUser(userid);
        console.log('Created user:', user);

        res.status(200).send({user});
    } catch(e) {
        console.error(e);
        res.status(500).send({ error: 'Internal Server Error' });
    } 

}; 


exports.registerEmail = async (req, res) => {
    console.log(req.body);
    try {
        const {email, password} = req.body;
        const user = await createUser(null, email, password);

        // Generate a token for the user
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).send({ user, token });
    } catch (error) {
        console.log(error);
        if (error.message === 'User already exists') {
            res.status(400).send({message: 'User already exists'});
        } else {
        res.status(400).send(error);
        }
    }
};

exports.loginEmail = async (req, res) => {
    console.log(req.body);
    try {
        const {email, password} = req.body;
        // Check if the user exists
        const user = await getUserByEmail(email);

        console.log('User:', user);

        // If the user doesn't exist, send an error message
        if (!user) {
            return res.status(400).send({message: 'Invalid email or password'});
        }

        // Check if the password is correct
        const isPasswordCorrect = password === user.password;
        // If the password is incorrect, send an error message
        if (!isPasswordCorrect) {
            return res.status(400).send({message: 'Invalid email or password'});
        }

        // Generate a token for the user
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).send({ user, token });
    } catch (error) {
        console.log(error);
        if (error.message === 'User already exists') {
            res.status(400).send({message: 'User already exists'});
        } else {
        res.status(400).send(error);
        }
    }
}