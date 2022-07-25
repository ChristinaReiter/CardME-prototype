import { useState, useEffect } from 'react';
import { TextField, Box, Button, Grid, Dialog, DialogTitle, Typography } from '@mui/material'; 
import EventService from '../services/EventService';
import EventItem from './EventItem';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import PropTypes from 'prop-types';









const Calendar = () => {
    const [calEvents, setCalEvents] = useState([]);
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
          setCalEvents([...calEvents,
            {
              title: res.title,
              start: res.eventDate,
              allDay: true,
              id: res.id
            }]);
        
        console.log("Event created")
        }
      ).catch(
        () => {              
          alert("Event not created");
        }
      );
    }
  

    const handleEventClick = (info) => {
      let day = info.event.start.toString().split("00:")[0]    

      alert(`Title: ${info.event.title}\nDate: ${day}\nDescription: ${info.event.extendedProps.description}`)

    }

    const renderEventContent = (eventInfo) => {
      //return (<Typography variant="h5">{eventInfo.event.title}</Typography>)
    }

     useEffect(() => {
        EventService.getEvents().then(res => {
            setEvents(res);
            const array = res.map(eve => {
              return {
                title: eve.title,
                start: eve.eventDate,
                allDay: true,
                id: eve._id,
                extendedProps: {description: eve.description}
              }
            })
            setCalEvents(array);            
        })
    }, []);
    
    
   
    return (
      <>
           <Typography variant="h3" sx={{ pl: "25px", pt: "10px"}}>My Calendar</Typography>
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

      <Box sx={{ pl: "25px", pr:"25px"}} >
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={calEvents}
        eventDisplay="background"
        eventClick={(info) => {handleEventClick(info)}}
        eventContent={renderEventContent}
      />
      </Box>
      
      


      <Box>
        {events.length > 0 ? (
        <div>          
          <Grid sx={{ padding:"25px"}} container spacing={2}>
            {events.map((event) => (
              <Grid item xs={12} md = {6} lg={4} key={event._id}>
                <EventItem event={event} changeEvent = {setEvents} allEvents = {events} changeCalEvent = {setCalEvents} allCalEvents = {calEvents} />
              </Grid>))}
          </Grid>
        </div> 
          ) : (<Typography variant="h5" sx={{ pl: "25px", pr:"25px"}}> You have no Events </Typography>)}

      </Box> 
      </>
    );
  };
  
  export default Calendar