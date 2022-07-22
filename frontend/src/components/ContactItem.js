import { useState, useEffect } from 'react'
import { Button, Popover, Typography, TextField } from '@mui/material';
import AcquaintanceService from '../services/AcquaintanceService';
import AddressService from '../services/AddressService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';




function ContactItem({contact}) {

  const address = AddressService.getAddress(contact.acquaintanceAddress)
  

  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

const deleteContact = (id) => {
    AcquaintanceService.deleteAcquaintance({id}).then(
        () => {  
          alert("Contact deleted");
          
        }
      )
}

const updateContact = (id) => {
    AcquaintanceService.updateAcquaintance({id}).then(
        () => { 
          alert("Contact updated");             
          
        }
      )
}

useEffect(() => {
  AddressService.getAddress(contact.acquaintanceAddress).then(res => {
      setName(contact.name);
      setStreet(res.street);
      setNumber(res.streetNumber);
      setZipcode(res.zipCode);
      setCity(res.city);
      setCountry(res.country);
  })
}, [/* contacts */]); 
//onClick={() => {updateContact(contact._id)}}
  return (
    <div className= "contact">
        <div><Typography>{contact.name}</Typography></div>
        <Button  onClick={() => deleteContact(contact._id)} startIcon={<DeleteForeverIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Delete
        </Button>  
        <Button aria-describedby={id} onClick={handleClick}  startIcon={<UpdateIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
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
       
        <form onSubmit={updateContact}>
            <TextField 
                sx={{ m: 1 }}
                type="text"
                label="Contact Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }} 
                type="text"
                label="Street"
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required>
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Zipcode"
                name="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required>
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required>
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required>
            </TextField>
            
            <Button
                sx={{ m: 2 }}
                color="secondary"
                variant="contained"
                type="submit">
                Register
            </Button>
        </form>
        
      </Popover>
    </div>
  )
}

export default ContactItem