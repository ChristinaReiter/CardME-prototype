import { useState, useEffect } from 'react';
import { TextField, Box, Button } from '@mui/material'; 
import AcquaintanceService from '../services/AcquaintanceService';
import AuthService from '../services/AuthService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';


const Contacts = () => {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [contacts, setContacts] = useState([]);

    const createContact = (e) => {
      e.preventDefault();

      AcquaintanceService.setAcquaintance({ name, street, number, zipcode, city, country}).then(
        () => {              
          alert("Contact created");
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
    }, [/* contacts */]); 

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

    const myContacts = contacts?.map(contact => 
     <li key={contact._id}>
         <b>{contact.name}</b>
         <Button  /* onClick={() => {deleteContact(contact._id)}} */  startIcon={<DeleteForeverIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Delete
        </Button>  
        <Button  /* onClick={() => {updateContact(contact._id)}} */ startIcon={<UpdateIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Update
        </Button> 
     </li>
    );

    


  
    return (
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
        
         <ul>{myContacts}</ul> 
              
      </Box>
    );
  };
  
  export default Contacts