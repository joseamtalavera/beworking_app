
// ConfirmationPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThanksPage from './ThanksPage';
import  CircularProgress from '@mui/material/CircularProgress';

const ConfirmationPage = () => {
  const { token } = useParams();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const confirmFrontEmail = async () => {
      if (token) {
        console.log('Token:', token);
        try {
          const response = await fetch(`http://localhost:5005/api/confirm/${token}`, {
            method: 'GET', // Or 'POST', depending on your backend
          });
          console.log('Response:', response);
          const data = await response.json();
          console.log('Data:', data);
          if (data.success) {
            setIsConfirmed(true);
            console.log('Email confirmed successfully');
          } else {
            console.error('Failed to confirm email');
          }
        } catch (error) {
          console.error('Error confirming email:', error);
        }
      } else {
        console.error('No token found');
      }
    };

    confirmFrontEmail();
  }, [token]);

  if (isConfirmed) {
    return <ThanksPage />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress color="secondary" />
  </div>
  );
};

export default ConfirmationPage;
