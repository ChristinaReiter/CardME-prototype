import { Tab, Tabs, Box, Button } from '@mui/material';
import { TabPanel } from '@mui/lab';
import React from 'react';
import { useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useParams, Outlet } from "react-router-dom";

const pages = ['view', 'orders', 'subscriptions', 'calendar', 'favorites', 'contacts', 'account'];

const styles = {
    tabss: {
    fontFamily: '"Abril Fatface"',
    fontSize: 15,
    color: "#000"
  },
};

 const ProfileOverview = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  return (
    <div>
      <Box  className='subheader'>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="secondary"         
        >
          <Tab component={Link} to='view' style={styles.tabss} icon={<HomeIcon />} iconPosition="start" label="Overview" />
          <Tab component={Link} to='orders' style={styles.tabss} icon={<ListIcon />} iconPosition="start" label="Orders" />
          <Tab component={Link} to='subscriptions' style={styles.tabss} icon={<AutorenewIcon />} iconPosition="start" label="Subscriptions" />
          <Tab component={Link} to='calendar' style={styles.tabss} icon={<CalendarMonthIcon />} iconPosition="start" label="Calendar" />
          <Tab component={Link} to='favorites' style={styles.tabss} icon={<FavoriteIcon />} iconPosition="start" label="Favorites" />
          <Tab component={Link} to='contacts' style={styles.tabss} icon={<PeopleAltIcon />} iconPosition="start" label="Contacts" />
          <Tab component={Link} to='details' style={styles.tabss} icon={<ManageAccountsIcon />} iconPosition="start" label="Account Details" />       
        </Tabs>        
        <Button style={styles.tabss} startIcon={<LogoutIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Sign Out
        </Button>
      </Box>
      <Outlet />     
    </div>
  );
};

export default ProfileOverview