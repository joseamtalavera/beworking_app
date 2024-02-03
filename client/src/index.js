import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './components/Login/LoginPage';
//import VirtualOffice from './components/VirtualOffice/VirtualOffice';
//import CoWorking from './components/CoWorking/CoWorking';
//import MeetingRooms from './components/MeetingRooms/MeetingRooms';
import AdminDashboard from './components/Dashboard/Admin/DashAdmin/AdminDashboard';
import UserDashboard from './components/Dashboard/User/DashUser/UserDashboard';
import PrivateRoute from './Utils/PrivateRoute';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

ReactDOM.render(
  <GoogleOAuthProvider clientId={googleClientId}>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      {/*<Route path="/virtual-office" element={<VirtualOffice />} />*/}
      {/*<Route path="/coworking" element={<CoWorking />} />*/}
      {/*<Route path="/meeting-rooms" element={<MeetingRooms />} />*/}
      <Route path='/dashboard/admin' element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path='/dashboard/user' element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
    </Routes>
  </Router>,
  </GoogleOAuthProvider>,
  document.getElementById('root')
);