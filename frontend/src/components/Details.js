import { useState, useEffect } from 'react'
import { Button, Popover, Typography, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import AuthService from '../services/AuthService'
import DetailsService from '../services/DetailsService'

const AccountDetails = () => {
  //const [account, setAccount] = useState({})
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  
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
    
      DetailsService.updateAccount({name: newName, email: newEmail}).then(
          res => { 
            //alert("Contact updated"); 
            console.log(res)
            console.log("Account updated")
            localStorage.setItem("name", JSON.stringify(res.name))
            localStorage.setItem("email", JSON.stringify(res.email))
  
            setName(res.name)
            setEmail(res.email)
  
      })
    }

 useEffect(() => {
    /* AuthService.getMe().then(
      res => {
        console.log(res)
        setName(res.name)
        setEmail(res.email)
      }
    )  */
    let account = JSON.parse(localStorage.getItem("account")) // above takes ages to get but is secure?!?!?
 
    setName(account.name)
    setEmail(account.email)

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
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }} 
                type="text"
                label="Email"
                name="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
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