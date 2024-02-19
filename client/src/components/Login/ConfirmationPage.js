
// ConfirmationPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThanksPage from './ThanksPage';
import  CircularProgress from '@mui/material/CircularProgress';

const ConfirmationPage = () => {
  const { confirmationToken } = useParams();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const confirmFrontEmail = async () => {
      if (confirmationToken) {
        console.log('Token:', confirmationToken);
        try {
          const response = await fetch(`http://localhost:5005/api/confirm/${confirmationToken}`, {
            method: 'GET', 
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
  }, [confirmationToken]);

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
