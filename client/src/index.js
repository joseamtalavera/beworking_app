import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './components/Login/LoginPage';
//import VirtualOffice from './components/VirtualOffice/VirtualOffice';
//import CoWorking from './components/CoWorking/CoWorking';
//import MeetingRooms from './components/MeetingRooms/MeetingRooms';
import AdminDashboard from './components/Dashboard/Admin/Dash/AdminDashboard';
import UserDashboard from './components/Dashboard/User/Dash/UserDashboard';
import PrivateRoute from './Utils/PrivateRoute';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      {/*<Route path="/virtual-office" element={<VirtualOffice />} />*/}
      {/*<Route path="/coworking" element={<CoWorking />} />*/}
      {/*<Route path="/meeting-rooms" element={<MeetingRooms />} />*/}
      <Route path='/dashboard/admin' element={<PrivateRoute component={AdminDashboard} />} />
      <Route path='/dashboard/user' element={<PrivateRoute component={UserDashboard} />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);