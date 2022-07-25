import { useState, useEffect } from 'react';
import { TextField, Box, Button, Grid, Typography } from '@mui/material'; 
import AcquaintanceService from '../services/AcquaintanceService';
import ContactItem from './ContactItem';


const Contacts = () => {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [contacts, setContacts] = useState([]);

    const createContact = (e) => {
      e.preventDefault();

      AcquaintanceService.setAcquaintance({ name, street, streetNumber, zipCode, city, country}).then(
        res => {  
          setContacts([...contacts, res]);
        console.log("Contact created")
        }
      ).catch(
        () => {              
          alert("Contact not created");
        }
      );
    }

    useEffect(() => {
        AcquaintanceService.getAcquaintances().then(res => {
            setContacts(res);
        })
    }, []); 
   
    return (
      <>
           <Typography variant="h3" sx={{ pl: "25px", pt: "10px"}}>My Contacts</Typography>
      <Box  display="flex" justifyContent="center" padding="5em">
        <form onSubmit={createContact}>
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
                Create Contact
            </Button>
        </form>             
              
      </Box>
      <Box>
        {contacts.length > 0 ? (
        <div>          
          <Grid sx={{ pl: "25px", pr:"25px"}} container spacing={2}>
            {contacts.map((contact) => (
              <Grid item xs={12} md = {6} lg={4} key={contact._id}>
                <ContactItem contact={contact} changeContact = {setContacts} allContacts = {contacts} />
              </Grid>))}
          </Grid>
        </div> 
          ) : (<Typography variant="h5" sx={{ pl: "25px", pr:"25px"}}> You have no Contacts </Typography>)}

      </Box>
      </>
    );
  };
  
  export default Contacts