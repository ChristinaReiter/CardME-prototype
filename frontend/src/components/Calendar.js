import { useState, useEffect } from 'react';
import { TextField, Box, Button, Grid, Typography, Popover, Card, CardHeader, CardContent, CardActions, Stack, Badge } from '@mui/material'; 
import EventService from '../services/EventService';
import EventItem from './EventItem';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import CakeIcon from '@mui/icons-material/Cake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MailIcon from '@mui/icons-material/Mail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderService from '../services/OrderService';
import { pink } from '@mui/material/colors';






const Calendar = () => {
    const [calEvents, setCalEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventDate, setEventDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [editAnchor, setEditAnchor] = useState(null);

    const [popTitle, setPopTitle] = useState('');
    const [popDescription, setPopDescription] = useState('');
    const [popDate, setPopDate] = useState('');
    const [popId, setPopId] = useState('');


    const [newEditTitle, setNewEditTitle] = useState('');
    const [newEditDescription, setNewEditDescription] = useState('');
    const [newEditDate, setNewEditDate] = useState('');
    const [orders, setOrders] = useState([]);
    const [hasOrder, setHasOrder] = useState(false);

    useEffect(() => {
      OrderService.getOrders().then(res => {
        setOrders(res);
      }) 
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
    

 

  const handleClose = () => {
    setAnchorEl(null);
    setEditAnchor(null);
    setNewEditDate('');
    setNewEditDescription('');
    setNewEditTitle('');
  };

  const open = Boolean(anchorEl);
  const editOpen = Boolean(editAnchor);

    const createEvent = (e) => {
      e.preventDefault();
      console.log(eventDate);
      console.log(title);

      EventService.setEvent({ eventDate, title, description}).then(
        res => {  
          setEvents([...events, res]);
          setCalEvents([...calEvents,
            {
              title: res.title,
              start: res.eventDate,
              allDay: true,
              id: res.id,
              extendedProps: {description: res.description}
            }]);
            setEventDate('');
            setTitle('');
            setDescription('');
        
        toast("Event created")
        }
      ).catch(
        () => {              
          toast("Event not created");
        }
      );
    }
  

    const handleEventClick = (info) => {
      let day = info.event.start.toString().split("00:")[0] 
      setAnchorEl(info.el)
      setPopTitle(info.event.title)
      setPopDescription(info.event.extendedProps.description)
      setPopDate(day)
      setPopId(info.event.id)
    
      const thisEvent = events.find(event => event._id === info.event.id);
     
      setNewEditDate(thisEvent.eventDate);
      setNewEditTitle(thisEvent.title);
      setNewEditDescription(thisEvent.description);

        const ordered = orders.filter(order => order.deliveryDate == thisEvent.eventDate)
        if(ordered.length > 0){
          setHasOrder(true)
        }else{
          setHasOrder(false)
        }
         

      

    }

    const renderEventContent = (eventInfo) => {

    let date = eventInfo.event.start.getDate();  //change like above?
    let month = eventInfo.event.start.getMonth() + 1; 
    let year = eventInfo.event.start.getFullYear();
    let monthh =  month > 9 ? month : '0' + month 
    let current = new Date();
    let currentMonth = current.getMonth() + 1;
    let currentYear = current.getFullYear();
    let currentDay = current.getDate();
    let currentMonthh = currentMonth > 9 ? currentMonth : '0' + currentMonth
    
    const eventDate = year + "-" + monthh + "-" + date;

    const ordered = orders.filter(order => order.deliveryDate.split('T')[0] == eventDate)

    
    const currentDate = currentYear + "-" + currentMonthh + "-" + currentDay;
    

      return (<>

      {currentDate <= eventDate ? (
        ordered.length > 0 ? ( 
      <>            
        
      <MailIcon sx={{ color: pink[500] }}/>

      <Typography variant="h6">{eventInfo.event.title}</Typography>
        </>
          ) : (<><BookmarkIcon sx={{ color: pink[500] }}/>
          <Typography variant="h6">{eventInfo.event.title}</Typography>
          </>)): (
            ordered.length > 0 ? ( 
              <>            
                 
              <MailIcon />
            
              <Typography variant="h6">{eventInfo.event.title}</Typography>
                </>
                  ) : (<><BookmarkIcon />
                  <Typography variant="h6">{eventInfo.event.title}</Typography>
                  </>)
          ) }


    </>)
    }

    const editEvent = (e, id) => {
      e.preventDefault(); 
      const data = {eventDate: newEditDate, title: newEditTitle, description: newEditDescription};
   
     
        EventService.updateEvent({data, id}).then(
           res => { 
            toast("Event updated"); 
 
   
             setEvents(prevState => {
               const updated = prevState.map(eve => {
                 if (eve._id === id) {
                   return res
                 }else {
                   return eve
                 }
               })         
             return updated
           })
           setCalEvents(prevState => {
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
   
   
           
          handleClose()
   
       }).catch(
         () => {              
           toast("Event not updated");
         }
       ); 
      
     }

     const handleClick = (e) => {
      setEditAnchor(e.currentTarget);
     }
 
    


    
   
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

<Popover
       
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Card variant="outlined" sx={{ pl: 1 }}>
         <CardHeader
           action={
            <Button onClick={handleClick}>
              <Typography color = "#f00">Edit Event</Typography>
            </Button>  }    
           subheader="Event Details"/>
          <CardContent>
          <Stack sx={{pb:1}} direction="row" alignItems="center" gap={1}>
            <CakeIcon/>
            <Typography variant="body1">{popTitle}</Typography>
          </Stack>
          <Stack sx={{pb:1}} direction="row" alignItems="center" gap={1}>
            <CalendarTodayIcon />
            <Typography variant="body1">{popDate}</Typography>
          </Stack>
          <Stack sx={{pb:1}}  direction="row" alignItems="center" gap={1}>
            <DescriptionIcon />
            <Typography variant="body1">{popDescription}</Typography>
          </Stack>
          <Typography color= {hasOrder ? "primary":'#f00'} variant="body1">{hasOrder ? "You have an order for this event" : "You don't have an order for this event"}</Typography>       
        </CardContent>  
        <Popover
        open={editOpen}
        anchorEl={editAnchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
       
        <form onSubmit={(e) => editEvent(e, popId)}>
             <TextField 
                sx={{ m: 1 }}
                type="date"
                
                name="eventDate"
                value={newEditDate.split('T')[0]}
                onChange={(e) => setNewEditDate(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }} 
                type="text"
                label="Title"
                name="title"
                value={newEditTitle}
                onChange={(e) => setNewEditTitle(e.target.value)}
                required> 
            </TextField>
            <TextField
                sx={{ m: 1 }}
                type="text"
                label="Description"
                name="description"
                value={newEditDescription}
                onChange={(e) => setNewEditDescription(e.target.value)}
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
      </Popover>
      </Box>
      
      <ToastContainer />  

      <Typography variant="h3" sx={{ pl: "25px", pt: "10px"}}>My Events</Typography>


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