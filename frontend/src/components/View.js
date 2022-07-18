import React from 'react'
import AuthService from '../services/AuthService';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const View = () => {
  const currentAccount = AuthService.getMe();
  const navigate = useNavigate();

useEffect(() => {
  if (!currentAccount) {
    navigate("/login");
  }
},[navigate, currentAccount])
  return (
   
     <div>       
      <strong> {currentAccount.name} 's Profile</strong>   
    </div> 
  )
}

export default View