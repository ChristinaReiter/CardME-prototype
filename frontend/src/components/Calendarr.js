import { useState, useEffect } from 'react';
import { TextField, Box, Button, Grid, Paper, Typography } from '@mui/material'; 
import EventService from '../services/EventService';
import EventItem from './EventItem';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 




const Calendarr = () => {
    const [events, setEvents] = useState([]);
    const [eventDate, setEventDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const createEvent = (e) => {
      e.preventDefault();
      console.log(eventDate);
      console.log(title);

      EventService.setEvent({ eventDate, title, description}).then(
        res => {  
          console.log(res)
          setEvents([...events, res]);
        
        console.log("Event created")
        }
      ).catch(
        () => {              
          alert("Event not created");
        }
      );
    }

     useEffect(() => {
        EventService.getEvents().then(res => {
            setEvents(res);
        })
    }, []);
    
    
   
    return (
      <>
      <Box  display="flex" justifyContent="center" padding="5em">
        <form onSubmit={createEvent}>
            <TextField 
                sx={{ m: 1 }}
                type="date"
                
                name="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }} 
                type="text"
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                >
            </TextField>
            
            <Button
                sx={{ m: 2 }}
                color="secondary"
                variant="contained"
                type="submit">
                Create Event
            </Button>
        </form>             
              
      </Box>

      <section>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={events}
      />
      </section>
      


      <Box>
        {events.length > 0 ? (
        <div>          
          <Grid container spacing={2}>
            {events.map((event) => (
              <Grid item xs={12} md = {6} lg={4} key={event._id}>
                <EventItem event={event} changeEvent = {setEvents} allEvents = {events} />
              </Grid>))}
          </Grid>
        </div> 
          ) : (<h3> You have no Events </h3>)}

      </Box> 
      </>
    );
  };
  
  export default Calendarr