import {GoogleLogin} from 'react-google-login';
import { Button } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import { GOOGLE_CLIENT_ID } from '../../Utils/config';
import { createUser } from '../../Utils/createUser';

const GoogleIcon = () => {

    return(
      // This is the Google logo SVG from https://developers.google.com/identity/branding-guidelines
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.501 12.2331C22.501 11.3698 22.4296 10.7398 22.2748 10.0864H12.2153V13.983H18.12C18.001 14.9514 17.3582 16.4097 15.9296 17.3897L15.9096 17.5202L19.0902 19.9349L19.3106 19.9564C21.3343 18.1247 22.501 15.4297 22.501 12.2331Z" fill="#4285F4"></path>
      <path d="M12.2147 22.5001C15.1075 22.5001 17.536 21.5667 19.3099 19.9567L15.9289 17.39C15.0242 18.0083 13.8099 18.44 12.2147 18.44C9.38136 18.44 6.97663 16.6083 6.11941 14.0767L5.99376 14.0871L2.6865 16.5955L2.64325 16.7133C4.40513 20.1433 8.02417 22.5001 12.2147 22.5001Z" fill="#34A853"></path>
      <path d="M6.12003 14.0765C5.89385 13.4232 5.76295 12.7231 5.76295 11.9998C5.76295 11.2764 5.89385 10.5765 6.10813 9.92313L6.10214 9.78398L2.75343 7.23535L2.64387 7.28642C1.91771 8.70977 1.50104 10.3081 1.50104 11.9998C1.50104 13.6915 1.91771 15.2897 2.64387 16.7131L6.12003 14.0765Z" fill="#FBBC05"></path>
      <path d="M12.2147 5.55997C14.2266 5.55997 15.5837 6.41163 16.3576 7.12335L19.3814 4.23C17.5243 2.53834 15.1075 1.5 12.2147 1.5C8.0242 1.5 4.40514 3.85665 2.64325 7.28662L6.10753 9.92332C6.97665 7.39166 9.3814 5.55997 12.2147 5.55997Z" fill="#EB4335"></path>
    </svg>
    );
};



//recives the buttonText prop from the Login.js file.
const GoogleButton = ({buttonText}) => {      


  //it uses the useNavigate hook to navigate to the dashboard page.
  const navigate = useNavigate();

  // Initialize the error state variable to null.
  const [error, setError] = useState(null);


 /*  this function is the callback function that gets called when the user clicks the Google login button
  and completes the Google login process. Meaning that the user has allow our application
  to use his credentials. Then onSuccess a token is available in the response object. */
  const responseGoogle = (response) => {
    if (response.error) {
      console.error('Login failed: ', response.error);
      setError('Login failed. Please try again.');// Set the error state variable to an error message.
    } else {
      console.log('Login success: ', response);
      createUser(response.tokenId);
      navigate('/dashboard/user');
      setError(null); // Clear error state when login is successful.
    }
  };


        /* The GoogleLogin component fromo the react-google-login library is used to render the Google login button.
        This componet is used to integrate Google's OAuth 2.0 authentication system into the application.
        */
        return (
          <div>
            {error && <p>{error}</p>} {/* Display error message when error state is not null */}
            <GoogleLogin          
                clientId={GOOGLE_CLIENT_ID} // The client ID from the Google Cloud Console.
                onSuccess={responseGoogle} // The callback function that is called when the user successfully completes the Google login process.
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'} // This is means that the authentication request will only be sent from the current host.
                render={renderProps => ( //This is a function that returns a custom button component.
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={() => {
                          console.log('Button clicked'); // This will print to the console
                          renderProps.onClick(); // This redirects the user to Googel's OAuth 2.0 authentication page.
                      }}
                        /* The disabled property of renderProps is managed internally by the GoogleLogin component. 
                        It's typically true when the Google API script hasn't loaded yet or if there was an error loading it, 
                        and false otherwise. */
                        disabled={renderProps.disabled} 
                        style={{ textTransform: 'none', marginBottom: '16px', color: '#808080', borderColor: 'orange', cursor: 'pointer' }}
                    >
                        {buttonText}
                    </Button>
                )}
            />
          </div>
        );
};

export default GoogleButton;







/*
Let's break it down again:

1. Client Side (React Application): The user clicks the Google login button, 
which is handled by the `GoogleButton` component. This triggers the Google OAuth process. 
The user is redirected to the Google sign-in page, 
where they enter their credentials and consent to share their profile information with your application.

2. Once the user successfully logs in, Google sends an ID token back to your application. 
This token is received in the `responseGoogle` function, 
which is the callback function for the Google login process.

3. The `responseGoogle` function calls the `createUser` function, passing the ID token as an argument. 
The `createUser` function sends a POST request to the `/api/users` endpoint on your server, 
including the ID token in the body of the request.



4. Server Side (Express Application): The POST request to the `/api/users` endpoint is handled by 
the `loginWithGoogle` function in your `authController.js` file. 
This function extracts the token from the request body.

5. The `loginWithGoogle` function calls the `verify` function, passing the token as an argument. 
The `verify` function uses the Google Auth Library to verify the token. If the token is valid, 
it returns the user's Google ID.

6. The `loginWithGoogle` function receives the user's Google ID from the `verify` function. 
It sends a response back to the client side, including the user's Google ID in the response.

7. **Client Side (React Application)**: The `createUser` function receives the response from the server. 
If the response includes a user ID, this means the token was valid and the user is logged in. 
The application can then navigate the user to the dashboard page.

So, the `GoogleButton` component and the `loginWithGoogle` function are linked through the HTTP request made in the `createUser` function. 
This request sends the ID token from the client side to the server side, 
where it's received and processed by the `loginWithGoogle` function.
*/