# Coworking Spaces Booking Platform

This project is a full-stack web application designed to facilitate the booking of coworking spaces. It leverages a React.js frontend, Node.js-Express backend, and PostgreSQL database to provide a seamless user experience for registering, logging in, and managing bookings.

## Development Setup

### Starting the Backend Server

1. Navigate to the backend directory.
2. Run `npm run dev` to start the server on port 5005.

### Starting the React Frontend

1. Navigate to the frontend directory.
2. Run `npm start` to start the React app on port 3003.

### Index.js

- Utilizes `document.getElementById('root')` to select where the app will be rendered in `index.html`.

### App.js

- Serves as the homepage and displays the navigation menu.

## Workflow

### Registration Process

1. `RegistrationForm.js` initiates registration with email and password, calling `authController.js /registerEmail` function.
2. Email Validation and Password Hashing are performed.
3. A JWT Confirmation Token is generated and emailed to the user.
4. The user confirms their email via a link, triggering the `ConfirmationPage.js`.
5. Upon confirmation, the backend marks the email as confirmed in the database.

### Login Process

1. `Login.js` manages user login, validating credentials and generating a JWT for session management.
2. Successful login updates authentication state, redirecting the user to their dashboard.

### Password Reset

1. `EmailRecoveryForm` initiates the password recovery process.
2. The backend sends a reset link to the user's email.
3. `ResetPasswordForm.js` allows the user to input a new password, updating the database accordingly.

## Security Considerations

- Implement lockout mechanisms after multiple failed login attempts to prevent brute force attacks.
- Protect against SQL injections by sanitizing inputs.
- Ensure CSRF protection to verify requests originate from your site.
- Address XSS vulnerabilities by sanitizing user inputs.
- Utilize CSP and helmet for enhanced security in Express apps.
- Consider rate limiting to mitigate DDOS attacks.
- Evaluate the use of cookies versus localStorage for storing tokens securely.

## Problems & Solutions

- Address common security vulnerabilities (SQL Injection, CSRF, XSS).
- Implement best practices for user authentication and data validation.
- Consider UI/UX improvements for a more cohesive style and better user flow.

## Conclusion

This project aims to provide a comprehensive solution for booking coworking spaces, with a strong emphasis on security, user experience, and efficient data management. Contributions and feedback are welcome to enhance its functionality and security posture.