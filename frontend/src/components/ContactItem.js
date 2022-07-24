import { useState, useEffect } from 'react'
import { Button, IconButton, Popover, Typography, TextField, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import AcquaintanceService from '../services/AcquaintanceService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';
import AddressService from '../services/AddressService';




function ContactItem({contact, changeContact, allContacts}) {  

  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [newStreet, setNewStreet] = useState("");
  const [newStreetNumber, setNewStreetNumber] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  
  

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
   const data = {name: name, street: newStreet, streetNumber: newStreetNumber, zipCode: newZipCode, city: newCity, country: newCountry};

  
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
        setStreet(newStreet)
        setStreetNumber(newStreetNumber)
        setZipCode(newZipCode)
        setCity(newCity)
        setCountry(newCountry)

    })
  }

 useEffect(() => {
  AddressService.getAddress(contact.acquaintanceAddress).then(res => {         // a lot of get requests but all update fields are prefilled ->> annoyiing when testing
      setName(contact.name);
      setStreet(res.street);
      setStreetNumber(res.streetNumber);
      setZipCode(res.zipCode);
      setCity(res.city);
      setCountry(res.country);

      setNewStreet(res.street);
      setNewStreetNumber(res.streetNumber);
      setNewZipCode(res.zipCode);
      setNewCity(res.city);
      setNewCountry(res.country);
  })
}, []);   
 
  return (
    <div>
      <Card sx={{backgroundColor: "#a7cda7"}}>
        <CardHeader
          action={
            <IconButton onClick={() => deleteContact(contact._id)}>
              <DeleteForeverIcon />
            </IconButton>
            
          }
          title={contact.name}
            />
        <CardContent>
          <Typography variant="h6">Adress:</Typography>
          <Typography variant="body1">{street} {streetNumber}</Typography>
          <Typography variant="body1">{zipCode} {city}</Typography>
          <Typography variant="body1">{country}</Typography>
        </CardContent>
        <CardActions disableSpacing>
         <Button aria-describedby={id} onClick={handleClick}  startIcon={<UpdateIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Update
        </Button>
        </CardActions>
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
                name="newStreet"
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Street-Number"
                name="newStreetNumber"
                value={newStreetNumber}
                onChange={(e) => setNewStreetNumber(e.target.value)}
                required>
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Zipcode"
                name="newZipCode"
                value={newZipCode}
                onChange={(e) => setNewZipCode(e.target.value)}
                required>
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="City"
                name="newCity"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                required>
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Country"
                name="newCountry"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
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
      </Card> 
        
    </div>
  )
}

export default ContactItem