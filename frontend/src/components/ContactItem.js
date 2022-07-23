import { useState, useEffect } from 'react'
import { Button, Popover, Typography, TextField } from '@mui/material';
import AcquaintanceService from '../services/AcquaintanceService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';




function ContactItem({contact, changeContact, allContacts}) {  

  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
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
          //alert("Contact deleted");
          console.log("Contact deleted");
          const updated = allContacts.filter(con => con._id !== id);
          changeContact(updated);
          
        }
      )
}

const updateContact = (e, id) => {
  e.preventDefault(); // w/o this, the page will refresh which might be good but is annoying for testing...
   const data = {name, street, streetNumber, zipCode, city, country}

  
    AcquaintanceService.updateAcquaintance({data, id}).then(
        res => { 
          //alert("Contact updated"); 
          console.log(res)
          console.log("Contact updated")

          changeContact(prevState => {
            const updated = prevState.map(con => {
              if (con._id === id) {
                return res
              }else {
                return con
              }
            })         
          return updated
        })

    })
  }

 /* useEffect(() => {
  AddressService.getAddress(contact.acquaintanceAddress).then(res => {         // a lot of get requests but all update fields are prefilled ->> annoyiing when testing
      setName(contact.name);
      setStreet(res.street);
      setStreetNumber(res.streetNumber);
      setZipCode(res.zipCode);
      setCity(res.city);
      setCountry(res.country);
  })
}, []);   */
 
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
       
        <form onSubmit={(e) => updateContact(e, contact._id)}>
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
                label="Street-Number"
                name="streetNumber"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                required>
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Zipcode"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
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
                Update
            </Button>
        </form>
        
      </Popover>
    </div>
  )
}

export default ContactItem