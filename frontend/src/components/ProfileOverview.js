import {  Box, Typography, Button } from '@mui/material';
import React from 'react';

const ProfileOverview = () => {
  return (
    <div>
      <Box display="flex" justifyContent="center" padding="3em">
        <Typography fontFamily='Antic'>Hello You There</Typography>
        <Button variant="contained" color="secondary">
          Create your own Card
        </Button>
      </Box>
    </div>
  );
};

export default ProfileOverview;
