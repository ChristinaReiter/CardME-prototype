import { Tab, Tabs, Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const styles = {
  tabss: {
    fontFamily: '"Abril Fatface"',
    fontSize: 15,
    color: "#000",
  },
};

const ProfileOverview = ({ setCurrentAccount, currentAccount, selectedTab, setSelectedTab }) => {

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (!currentAccount) {
      navigate("/login");
    }
    }, [currentAccount]);
  

  const logOut = () => {
    AuthService.logout().then(() => {
      setCurrentAccount(undefined);
      navigate("/login");
    });
  };

  return (
    <div>
      <Box className="subheader">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="secondary"
          scrollButtons="auto"
        >
          <Tab
            component={Link}
            to="view"
            style={styles.tabss}
            icon={<HomeIcon />}
            iconPosition="start"
            label="Overview"
          />
          <Tab
            component={Link}
            to="orders"
            style={styles.tabss}
            icon={<ListIcon />}
            iconPosition="start"
            label="Orders"
          />
          <Tab
            component={Link}
            to="subscriptions"
            style={styles.tabss}
            icon={<AutorenewIcon />}
            iconPosition="start"
            label="Subscriptions"
          />
          <Tab
            component={Link}
            to="calendar"
            style={styles.tabss}
            icon={<CalendarMonthIcon />}
            iconPosition="start"
            label="Calendar"
          />
          <Tab
            component={Link}
            to="favorites"
            style={styles.tabss}
            icon={<FavoriteIcon />}
            iconPosition="start"
            label="Favorites"
          />
          <Tab
            component={Link}
            to="contacts"
            style={styles.tabss}
            icon={<PeopleAltIcon />}
            iconPosition="start"
            label="Contacts"
          />
          <Tab
            component={Link}
            to="details"
            style={styles.tabss}
            icon={<ManageAccountsIcon />}
            iconPosition="start"
            label="Account Details"
          />
        </Tabs>
        <Button
          onClick={logOut}
          style={styles.tabss}
          startIcon={<LogoutIcon />}
          sx={{ marginLeft: "auto", color: "black", pr: "2em" }}
        >
          Sign Out
        </Button>
      </Box>
      <Outlet />
    </div>
  );
};

export default ProfileOverview;
