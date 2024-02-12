const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const {createUser} = require('../model/queries');
const { getUserByEmail } = require('../model/queries');
const bcrypt = require('bcrypt');
const { decrypt } = require('dotenv');
const { getUserById } = require('../model/queries');
const nodemailer = require('nodemailer');



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

exports.resetPassword = async (req, res) => {
    const { id, timestamp, password } = req.body;
    try {
        // Decrypt the id and timestamp
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the timestamp is not too old
        const oneHour = 60 * 60 * 1000; 
        if (Date.now() - decryptedTimestamp > oneHour) {
            return res.status(400).send({message: 'The link has expired'});
        }

        //Find the user by id
        const user = await getUserById(decryptedId);
        if (!user) {
            return res.status(400).send({message: 'User does not exist'});
        }

        // Update the user's password and save the user
        user.password = password; // make sure to hash the password
        await user.save();

        res.status(200).send({message: 'Password reset successful'});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Something went wrong'});
    }
}

exports.sendResetEmail = async (req, res) => {
    const {email} = req.body;

    try {
        //Find the user buy email
        const user = await getUserByEmail(email);
        if (!user){
            return res.status(400).send({message: 'User does not exist'});
        }

        // Generate a tranporter for using the default SMTP 
        let tranporter = nodemailer.createTransport({
            host: 'smtp.ionos.es',
            port: 587,
            secure: false,
            auth: {
                user: 'info@mo-rentals.com',
                pass: '@Rakna6164',
            }
        });

        //send email with defined transport object
        let info = await tranporter.sendMail({
            from: '"BeWorking" info@mo-rentals.com', 
            to: email,
            subject: "BeWorking: Please Password Reset",
            text: "Click the link to reset your password",
            html: `
            <div style="text-align: center;">
                <p style="margin-top: 30px;">You have requested a password reset. Click the link below to reset your password. If you did not request a password reset, please ignore this email.</p>
                <a href="http://localhost:3003/reset" style="display: block; padding: 16px 0; margin: 20px auto; width: 300px; background-color: orange; color: white; text-decoration: none; font-size: 16px; border-radius: 25px; cursor: pointer;">Reset Password</a>
            </div>
            `
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).send({message: 'Password reset email sent'});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Something went wrong'});
    }
}   