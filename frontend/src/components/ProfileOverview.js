import { Tab, Tabs, Box } from '@mui/material';
import React from 'react';
import { useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';

 function ProfileOverview() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box  border={1} borderColor="red" justifyContent= 'flex-end'>
      <Tabs
        value={value}
        onChange={handleChange}      
      >
        <Tab icon={<HomeIcon />} iconPosition="start" label="Overview" />
        <Tab icon={<ListIcon />} iconPosition="start" label="Orders" />
        <Tab icon={<AutorenewIcon />} iconPosition="start" label="Subscriptions" />
        <Tab icon={<CalendarMonthIcon />} iconPosition="start" label="Calendar" />
        <Tab icon={<FavoriteIcon />} iconPosition="start" label="Favorites" />
        <Tab icon={<PeopleAltIcon />} iconPosition="start" label="Contacts" />
        <Tab icon={<ManageAccountsIcon />} iconPosition="start" label="Account Details" />
      </Tabs>
    </Box>
  );
};

export default ProfileOverview