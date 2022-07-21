import React from 'react'
import { Button } from '@mui/material';
import AcquaintanceService from '../services/AcquaintanceService';
import AuthService from '../services/AuthService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';


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

function ContactItem({contact}) {
  return (
    <div className= "contact">
        <div><h2>{contact.name}</h2></div>
        <Button  onClick={() => deleteContact(contact._id)} startIcon={<DeleteForeverIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Delete
        </Button>  
        <Button  /* onClick={() => {updateContact(contact._id)}} */ startIcon={<UpdateIcon />} sx= {{marginLeft:'auto', color:'black', pr: '2em' }}>
          Update
        </Button> 
            </div>
  )
}

export default ContactItem