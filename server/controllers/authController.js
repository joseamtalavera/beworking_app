const jwt = require('jsonwebtoken');
const {createUser} = require('../model/queries');
const { getUserByEmail } = require('../model/queries');
const { getUserById } = require('../model/queries');
const { getUserByConfirmationToken, confirmUserEmail } = require('../model/queries');
const { updateUserPassword } = require('../model/queries');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;
const crypto = require('crypto');

const registerEmail = async (req, res) => {
    try {
        let {email, password} = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Generate a confirmation token
        const confirmationToken = crypto.randomBytes(20).toString('hex'); //this is the token that we keep in the database and send to the user's email for confirmation
        console.log('Confirmation token:', confirmationToken);

        // Create a new user in the database
        const user = await createUser(null, email, hashedPassword, confirmationToken);
        if (user.error) {
            console.log('Error Createing user:', user.error);
            res.status(400).send({message: 'User already exists'})
            return;
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
                pass: '@Rakna03100310',
            }
        });

        // Send email to confirm email address
        try{
        await transporter.sendMail({
            from: '"BeWorking" info@mo-rentals.com',
            to: email,
            subject: "BeWorking: Please confirm your email",
            text: "Click the link to confirm your email",
            html: `
            <div style="text-align: center;">
                <p style="margin-top: 30px;">Thank you for registering. Please click the link below to confirm your email address.</p>
                <a href="http://localhost:3003/confirm-email/${confirmationToken}" style="display: inline-block; padding: 8px 16px; margin: 20px auto; width: auto; background-color: transparent; color: orange; text-decoration: none; font-size: 14px; border: 2px solid orange; border-radius: 25x; cursor: pointer;">Confirm Email</a>      
            </div>
            `
        });       
        } catch (error) {
        console.log('Error sending email:', error);
        }
        res.status(201).send({user});
    } catch (error) {
        console.log('Error:', error);
        if (error.message === 'User already exists') {
            res.status(400).send({message: 'User already exists'});
        } else {
        res.status(400).send(error);
        }
    }
};

const confirmEmail = async (req, res) => {
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

const loginEmail = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if the user exists
        const user = await getUserByEmail(email);

        // If the user doesn't exist, send an error message
        if (!user) {
            return res.status(400).send({message: 'Invalid email'});
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // If the password is incorrect, send an error message
        if (!isPasswordCorrect) {
            return res.status(400).send({message: 'Invalid password'});
        }

        // Generate a token for the user
        const token = jwt.sign({id:user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1h'}); 
        
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict',
            expires: new Date(Date.now() + 3600000), //1 hour
            });
            
        res.status(200).send({user});
    } catch (error) {
        console.log(error);
        if (error.message === 'User already exists') {
            res.status(400).send({message: 'User already exists'});
        } else {
        res.status(400).send(error);
        }
    }
}

const resetPassword = async (req, res) => {
    console.log('Reset password:', req.body);
    const { resetToken, password } = req.body;

    try {
        // Decrypt the id and timestamp
        const payload = jwt.verify(resetToken, process.env.JWT_SECRET);
        const {id, timestamp} = payload;
        console.log('Payload:', payload);

        // Check if the timestamp is not too old
        const oneHour = 60 * 60 * 1000; 
        if (Date.now() - timestamp > oneHour) {
            console.log('The link has expired');
            return res.status(400).send({message: 'The link has expired'});
        }

        //Find the user by id
        const user = await getUserById(id);
        if (!user) {
            console.log('User does not exist');
            return res.status(400).send({message: 'User does not exist'});
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update the user's password and save the user
        console.log('Updating password:', id, hashedPassword);
        await updateUserPassword(id, hashedPassword);
        console.log('Password updated');

        res.status(200).send({message: 'Password reset successful'});
    } catch (error) {
        console.log(error);
        console.log('Error resetting password:', error);
        res.status(500).send({message: 'Something went wrong'});
    }
}

const sendResetEmail = async (req, res) => {
    const {email} = req.body;

    try {
        //Find the user buy email
        const user = await getUserByEmail(email);
        if (!user){
            return res.status(400).send({message: 'User does not exist'});
        }

        // Generate a token for the user
        const resetToken = jwt.sign({id: user.id, timestamp: Date.now()}, process.env.JWT_SECRET, {expiresIn: '1h'});

        // Generate a tranporter for using the default SMTP 
        let transporter = nodemailer.createTransport({
            host: 'smtp.ionos.es',
            port: 587,
            secure: false,
            auth: {
                user: 'info@mo-rentals.com',
                pass: '@Rakna03100310',
            }
        });

        //send email with defined transport object
        let info = await transporter.sendMail({
            from: '"BeWorking" info@mo-rentals.com', 
            to: email,
            subject: "BeWorking: Please Reset Your Password",
            text: "Click the link to reset your password",
            html: `
            <div style="text-align: center;">
                <p style="margin-top: 30px;">You have requested a password reset. Click the link below to reset your password. If you did not request a password reset, please ignore this email.</p>
                <a href="http://localhost:3003/reset/${resetToken}" style="display: inline-block; padding: 8px 16px; margin: 20px auto; width: auto; background-color: transparent; color: orange; text-decoration: none; font-size: 14px; border: 2px solid orange; border-radius: 25x; cursor: pointer;">Reset Password</a>
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

module.exports = {
    registerEmail,
    loginEmail,
    resetPassword,
    sendResetEmail,
    confirmEmail,
};