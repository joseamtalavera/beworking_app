//import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom'; // package for working with the DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';// components for setting up routes
import App from './App';
import LoginPage from './components/Login/LoginPage';
//import VirtualOffice from './components/VirtualOffice/VirtualOffice';
//import CoWorking from './components/CoWorking/CoWorking';
//import MeetingRooms from './components/MeetingRooms/MeetingRooms';
import AdminDashboard from './components/Dashboard/Admin/DashAdmin/AdminDashboard';
import UserDashboard from './components/Dashboard/User/DashUser/UserDashboard';
import PrivateRoute from './Utils/PrivateRoute';
import PasswordResetForm from './components/Login/PasswordResetForm';
import PasswordResetPage from './components/Login/PasswordResetPage';
import ConfirmationPage from './components/Login/ConfirmationPage';
import ThanksPage from './components/Login/ThanksPage';


//const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

ReactDOM.render(
  // <GoogleOAuthProvider clientId={googleClientId}>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/reset" element={<PasswordResetForm />} /> */}
      <Route path="/confirm-email/:confirmationToken" element={<ConfirmationPage />} />
      <Route path="/thanks" element={<ThanksPage />} />
      <Route path="/reset/:token" element={<PasswordResetPage />} />   
      {/*<Route path="/virtual-office" element={<VirtualOffice />} />*/}
      {/*<Route path="/coworking" element={<CoWorking />} />*/}
      {/*<Route path="/meeting-rooms" element={<MeetingRooms />} />*/}
      <Route path='/dashboard/admin' element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path='/dashboard/user' element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
    </Routes>
  </Router>,
  //</GoogleOAuthProvider> 
  document.getElementById('root')// mount the app to the root element
);