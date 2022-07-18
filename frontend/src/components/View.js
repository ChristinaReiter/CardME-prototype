import React from 'react'
import AuthService from '../services/AuthService';
import { Typography } from '@mui/material';

const View = () => {
  const currentAccount = AuthService.getMe();
  return (
    //<div> View </div>
     <div>       
      <strong>{currentAccount.name}'s Profile</strong>   
    </div> 
  )
}

export default View