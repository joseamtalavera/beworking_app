const jwt = require('jsonwebtoken');
//const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const {createUser} = require('../model/queries');
const { getUserByEmail } = require('../model/queries');
const { getUserById } = require('../model/queries');
const { getUserByConfirmationToken, confirmUserEmail } = require('../model/queries');

const bcrypt = require('bcrypt');
//const { decrypt } = require('dotenv');
const nodemailer = require('nodemailer');
const validator = require('validator');
const saltRounds = 10;
const crypto = require('crypto');
const { use } = require('passport');


// token verification for google login
/* async function verify(token){
    console.log("Google Client ID (audience):", process.env.GOOGLE_CLIENT_ID); 

    
    const ticket = await client.verifyIdToken({ 
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload(); 
    const userid = payload['sub']; 
    return userid; 
} */


// Google login
/* exports.loginWithGoogle = async (req, res) => {

    const {token} = req.body;   
    try {
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
 */

// register new user
exports.registerEmail = async (req, res) => {
    try {
        let {email, password} = req.body;

        // Validate the email
        email = email.trim();
        if (!validator.isEmail(email)) {
            return res.status(400).send({message: 'Invalid email'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Generate a confirmation token
        const confirmationToken = crypto.randomBytes(20).toString('hex'); //this is the token that we keep in the database and send to the user's email and sent to the user in the email
        console.log('Confirmation token:', confirmationToken);

        // Create a new user in the database
        const user = await createUser(null, email, hashedPassword, confirmationToken);
        if (user.error) {
            console.log('Error Createing user:', user.error);
        } else {
            console.log('Created user:', user);
        }

        // Generate a transporter for using the default SMTP
        let transporter = nodemailer.createTransport({
            host: 'smtp.ionos.es',
            port: 587,
            secure: false,
            auth: {
                user: 'info@mo-rentals.com',
                pass: '@Rakna6164',
            }
        });

        // Send email with defined transport object
        try{
        let info = await transporter.sendMail({
            from: '"BeWorking" info@mo-rentals.com',
            to: email,
            subject: "BeWorking: Please confirm your email",
            text: "Click the link to confirm your email",
            html: `
            <div style="text-align: center;">
                <p style="margin-top: 30px;">Thank you for registering. Please click the link below to confirm your email address.</p>
                <a href="http://localhost:3003/confirm-email/${confirmationToken}" style="display: block; padding: 16px 0; margin: 20px auto; width: 300px; background-color: orange; color: white; text-decoration: none; font-size: 16px; border-radius: 25px; cursor: pointer;">Confirm Email</a>      
            </div>
            `
        });       
        } catch (error) {
        console.log('Error sending email:', error);
        }

        //console.log("Confirmation email sent: %s", info.messageId);
        res.status(201).send({user});
    } catch (error) {
        console.log(error);
        if (error.message === 'User already exists') {
            res.status(400).send({message: 'User already exists'});
        } else {
        res.status(400).send(error);
        }
    }
};

// confirm email
exports.confirmEmail = async (req, res) => {
    const {confirmationToken} = req.params;
    try {
        const user = await getUserByConfirmationToken(confirmationToken);
        if (!user) {
            return res.status(400).send({message: 'Invalid token'});
        }
        const updated = await confirmUserEmail(user.id);
        if (updated){
            res.status(200).json({ success: true, message: 'Email confirmed' });
        } else {
            throw new Error('Error confirming email');
        }
    } catch (error){
        console.log('Error confirming email:', error);
        return res.status(500).send({message: 'Something went wrong'});
    }
    
};




// login user
exports.loginEmail = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if the user exists
        const user = await getUserByEmail(email);
        console.log('User:', user);

        // If the user doesn't exist, send an error message
        if (!user) {
            return res.status(400).send({message: 'Invalid email'});
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // If the password is incorrect, send an error message
        if (!isPasswordCorrect) {
            return res.status(400).send({message: 'password'});
        }

        // Generate a token for the user
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: '1h'}); //this token is sent to the RegistrationForm.js, in line 76 and stored in localStorage
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


// reset password
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
        // Decrypt the id and timestamp
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const {id, timestamp} = payload;

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

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update the user's password and save the user
        user.password = hashedPassword; // make sure to hash the password
        await user.save();

        res.status(200).send({message: 'Password reset successful'});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Something went wrong'});
    }
}


//resend reset email
exports.sendResetEmail = async (req, res) => {
    const {email} = req.body;

    try {
        //Find the user buy email
        const user = await getUserByEmail(email);
        if (!user){
            return res.status(400).send({message: 'User does not exist'});
        }

        // Generate a token for the user
        const token = jwt.sign({id: user._id, timestamp: Date.now()}, process.env.JWT_SECRET, {expiresIn: '1h'});

        // Generate a tranporter for using the default SMTP 
        let transporter = nodemailer.createTransport({
            host: 'smtp.ionos.es',
            port: 587,
            secure: false,
            auth: {
                user: 'info@mo-rentals.com',
                pass: '@Rakna6164',
            }
        });

        //send email with defined transport object
        let info = await transporter.sendMail({
            from: '"BeWorking" info@mo-rentals.com', 
            to: email,
            subject: "BeWorking: Please Password Reset",
            text: "Click the link to reset your password",
            html: `
            <div style="text-align: center;">
                <p style="margin-top: 30px;">You have requested a password reset. Click the link below to reset your password. If you did not request a password reset, please ignore this email.</p>
                <a href="http://localhost:3003/reset/${token}" style="display: block; padding: 16px 0; margin: 20px auto; width: 300px; background-color: orange; color: white; text-decoration: none; font-size: 16px; border-radius: 25px; cursor: pointer;">Reset Password</a>
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