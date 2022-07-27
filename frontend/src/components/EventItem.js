import { useState, useEffect } from 'react'
import { Button, IconButton, Popover, Typography, TextField, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';
import EventService from '../services/EventService';




function EventItem({event, changeEvent, allEvents, changeCalEvent, allCalEvents}) {  

  const [anchorEl, setAnchorEl] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [newEventDate, setNewEventDate] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

const deleteEvent = (id) => {
    EventService.deleteEvent({id}).then(
        () => {  
          //alert("Contact deleted");
          console.log("Event deleted");
          const updated = allEvents.filter(eve => eve._id !== id);
          changeEvent(updated);

          const updatedCal = allCalEvents.filter(eve => eve.id !== id);
          changeCalEvent(updatedCal);
          
        }
      )
}

const updateEvent = (e, id) => {
  e.preventDefault(); // w/o this, the page will refresh which might be good but is annoying for testing...
   const data = {eventDate: newEventDate, title: newTitle, description: newDescription};

  
    EventService.updateEvent({data, id}).then(
        res => { 
          //alert("Contact updated"); 
          console.log(res)
          console.log("Event updated")

          changeEvent(prevState => {
            const updated = prevState.map(eve => {
              if (eve._id === id) {
                return res
              }else {
                return eve
              }
            })         
          return updated
        })
        changeCalEvent(prevState => {
            const updated = prevState.map(eve => {
              if (eve.id === id) {
                return {
                    title: res.title,
                    start: res.eventDate,
                    allDay: true,
                    id: res._id,
                    extendedProps: {description: res.description}
                    }
              }else {
                return eve
              }
            })         
          return updated
        })


        
        console.log("hi")
        setEventDate(newEventDate)
        setTitle(newTitle)
        setDescription(newDescription)

    })
  }

 useEffect(() => {
    if (event) {
        setEventDate(event.eventDate)
        setTitle(event.title)
        setDescription(event.description)

        setNewEventDate(event.eventDate)
        setNewTitle(event.title)
        setNewDescription(event.description)
    }
    
  
}, []);   
 
  return (
    <div>
      <Card sx={{backgroundColor: "#a7cda7"}}>
        <CardHeader
          action={
            <IconButton onClick={() => deleteEvent(event._id)}>
              <DeleteForeverIcon />
            </IconButton>            
          }
          title={title}
            />
        <CardContent>
          <Typography variant="h6">Date:</Typography>
          <Typography variant="body1">{eventDate.split('T')[0]} </Typography>
          <Typography variant="h6">Description:</Typography>
          <Typography variant="body1">{description} </Typography>
      
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
       
        <form onSubmit={(e) => updateEvent(e, event._id)}>
            <TextField 
                sx={{ m: 1 }}
                type="date"
                
                name="eventDate"
                value={newEventDate.split('T')[0]}
                onChange={(e) => setNewEventDate(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }} 
                type="text"
                label="Title"
                name="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Description"
                name="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                >
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

export default EventItem