// index.js

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
//import PasswordResetForm from './components/Login/PasswordResetForm';
import PasswordResetPage from './components/Login/PasswordResetPage';
import ConfirmationPage from './components/Login/ConfirmationPage';
import ThanksPage from './components/Login/ThanksPage';
import Users from './components/Dashboard/Admin/Users/Users';
import User from './components/Dashboard/Admin/Users/User';
import AddUser from './components/Dashboard/Admin/Users/AddUser';
import EmailRecoveryForm from './components/Login/EmailRecoveryForm';

ReactDOM.render(
  
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recover" element={<EmailRecoveryForm />} />
      {/* <Route path="/reset" element={<PasswordResetForm />} /> */}
      <Route path="/confirm-email/:confirmationToken" element={<ConfirmationPage />} />
      <Route path="/thanks" element={<ThanksPage />} />
      <Route path="/reset/:resetToken" element={<PasswordResetPage />} />   
      {/*<Route path="/virtual-office" element={<VirtualOffice />} />*/}
      {/*<Route path="/coworking" element={<CoWorking />} />*/}
      {/*<Route path="/meeting-rooms" element={<MeetingRooms />} />*/}
      <Route path='/dashboard/admin' element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path='/dashboard/admin/users' element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path='/dashboard/admin/users/:id' element={<PrivateRoute><User /></PrivateRoute>} />
      <Route path='/dashboard/admin/users/add-user' element={<PrivateRoute><AddUser /></PrivateRoute>} />
      <Route path='/dashboard/user' element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
    </Routes>
  </Router>,
  
  document.getElementById('root')
);