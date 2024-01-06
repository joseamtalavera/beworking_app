const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('341971575995-q790nto94oa2mijq0rvbf457mn0mihfm.apps.googleusercontent.com');

async function verify(token){
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '341971575995-q790nto94oa2mijq0rvbf457mn0mihfm.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
 
}

// Export the loginWithGoogle function
exports.loginWithGoogle = async (req, res) => {
app.post('/api/login', async (req, res) => {
    const {token} = req.body.token;
    try {
        await verify(token);
        // if the token is valid, we can send the user data to frontend
    } catch(e) {
        // if there's an error, we'll send the error in the response
        res.status(401).send('The token you provided is invalid');
    }
})
};    