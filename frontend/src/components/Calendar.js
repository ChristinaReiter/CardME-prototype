import { useState, useEffect } from 'react';
import { TextField, Box, Button, Grid, Typography, Popover, Card, CardHeader, CardContent, CardActions, Stack, Badge } from '@mui/material'; 
import EventService from '../services/EventService';
import EventItem from './EventItem';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import CakeIcon from '@mui/icons-material/Cake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import MailIcon from '@mui/icons-material/Mail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderService from '../services/OrderService';






const Calendar = () => {
    const [calEvents, setCalEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventDate, setEventDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const [popTitle, setPopTitle] = useState('');
    const [popDescription, setPopDescription] = useState('');
    const [popDate, setPopDate] = useState('');
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
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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

      let date = info.event.start.getDate();
      let month = info.event.start.getMonth() + 1;
      let year = info.event.start.getFullYear();
      let monthh =  month > 9 ? month : '0' + month    
  
        const ordered = orders.filter(order => order.deliveryDate.split('T')[0] == ""+year+"-"+monthh+"-"+date)
        if(ordered.length > 0){
          setHasOrder(true)
        }else{
          setHasOrder(false)
        }
         

      

    }

    const renderEventContent = (eventInfo) => {

    let date = eventInfo.event.start.getDate();
    let month = eventInfo.event.start.getMonth() + 1;
    let year = eventInfo.event.start.getFullYear();
    let monthh =  month > 9 ? month : '0' + month    

      const ordered = orders.filter(order => order.deliveryDate.split('T')[0] == ""+year+"-"+monthh+"-"+date)
      return (<>
      
      {ordered.length > 0 ? (<>
                  
          <Badge variant="dot"  color="secondary">
      <MailIcon/>
    </Badge>
      <Typography variant="h6">{eventInfo.event.title}</Typography>
        </>
          ) : (<><MailIcon/>
          <Typography variant="h6">{eventInfo.event.title}</Typography>
          </>)}
    </>)
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
        id={id}
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
          <Stack direction="row" alignItems="center" gap={1}>
            <DescriptionIcon />
            <Typography variant="body1">{popDescription}</Typography>
          </Stack>
          <Typography color= {hasOrder ? "primary":'#f00'} variant="body1">{hasOrder ? "You have an order for this event" : "You don't have an order for this event"}</Typography>       
        </CardContent>            
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