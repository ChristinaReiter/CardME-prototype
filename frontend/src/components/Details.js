import { useState, useEffect } from 'react'
import {  Button,
  Box,
  IconButton,
  Popover,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import LockResetIcon from '@mui/icons-material/LockReset';
import AuthService from '../services/AuthService'
import DetailsService from '../services/DetailsService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AccountDetails = () => {
  //const [account, setAccount] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const [pwAnchor, setPwAnchor] = useState(null)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePwClick = (event) => {
    setPwAnchor(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setPwAnchor(null);
    setNewPassword("")
    setPassword("")
  };

  const open = Boolean(anchorEl);
  const pwOpen = Boolean(pwAnchor);



  const updateAccount = (e) => {
    e.preventDefault(); // w/o this, the page will refresh which might be good but is annoying for testing... 
    
      DetailsService.updateAccount({name: newName}).then(
          res => { 
            toast("Account updated"); 
            console.log(res)
            console.log("Account updated")           
  
            setName(res.name)
            setEmail(res.email)
            setNewName("")
            handleClose()
  
      })
    }

    const changePw = (e) => {
      e.preventDefault(); // w/o this, the page will refresh which might be good but is annoying for testing... 
      
        DetailsService.changePassword({password: password, newPassword: newPassword}).then(
            res => { 
              res.status ? toast(res.message) : toast("Password updated");             
              setNewPassword("")
              setPassword("")
              handleClose()
        
        })
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
      <Typography sx={{ pl: "25px", pt: "10px", pb: "20px"  }} variant="h3">My Account Details</Typography>

      <Box sx={{ pl: "25px", pt: "10px", pb: "20px", pr: "25px"  }}>
      <Card sx={{ backgroundColor: "#a7cda7" }}>
        <CardHeader         
          title={name}
        />
        <CardContent>
          <Typography variant="h5">Email: {email}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
  
            onClick={handleClick}
            startIcon={<UpdateIcon />}
            sx={{ marginLeft: "auto", color: "black", pr: "2em" }}
          >
            Update Name
          </Button>
          <Button
   
            onClick={handlePwClick}
            startIcon={<LockResetIcon />}
            sx={{ marginLeft: "auto", color: "black", pr: "2em" }}
          >
            Change Password
          </Button>
        </CardActions>
        <Popover
 
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
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
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

        <Popover
      
        open={pwOpen}
        anchorEl={pwAnchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       
        <form onSubmit={changePw}>
            <TextField 
                sx={{ m: 1 }}
                type="password"
                label="Current Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required> 
            </TextField>
            <TextField 
                sx={{ m: 1 }}
                type="password"
                label="New Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required> 
            </TextField>
            
            <Button
                sx={{ m: 2 }}
                color="secondary"
                variant="contained"
                type="submit">
                Change Password 
            </Button>
        </form>
        </Popover>
        </Card>
        

      <ToastContainer />
      </Box>
    </div>

  )
}

export default AccountDetails