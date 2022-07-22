import { useState, useEffect } from 'react'
import { Button, Popover, Typography, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import AuthService from '../services/AuthService'

const AccountDetails = () => {
  const [account, setAccount] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



const updateAccount = (e) => {
  e.preventDefault(); // w/o this, the page will refresh which might be good but is annoying for testing...
   

  /* 
    AcquaintanceService.updateAcquaintance({data, id}).then(
        res => { 
          //alert("Contact updated"); 
          console.log(res)
          console.log("Contact updated")
               
          
        }
      ) */
}


 useEffect(() => {
    AuthService.getMe().then(
      res => {
        setName(res.name)
        setEmail(res.email)
      }
    ) 
 }, [])
  
  return (
    <div>
      <Typography variant="h2">{name}'s Account Details</Typography>
      <Typography variant="h4" align="center">Name: {name}</Typography>
      <Typography variant="h4" align="center">Email: {email}</Typography>
      <Button align="center" aria-describedby={id} onClick={handleClick}  startIcon={<UpdateIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Update
        </Button> 
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       
        <form onSubmit={updateAccount}>
            <TextField 
                sx={{ m: 1 }}
                type="text"
                label="Account Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }} 
                type="text"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required> 
            </TextField>
        
            
            <Button
                sx={{ m: 2 }}
                color="secondary"
                variant="contained"
                type="submit">
                Update
            </Button>
        </form>
        
      </Popover>
    </div>
  )
}

export default AccountDetails