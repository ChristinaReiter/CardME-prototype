import { useState, useEffect } from 'react';
import { TextField, Box, Button, Typography, Popover, Card, CardHeader, CardContent, CardActions, Stack, Badge } from '@mui/material'; 
import EventService from '../services/EventService';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import CakeIcon from '@mui/icons-material/Cake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import OrderService from '../services/OrderService';

function ShortCalendar() {  

  const [calEvents, setCalEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [orders, setOrders] = useState([]);

  const [popTitle, setPopTitle] = useState('');
  const [popDescription, setPopDescription] = useState('');
  const [popDate, setPopDate] = useState('');
  const [hasOrder, setHasOrder] = useState(false);
    const navigate = useNavigate();

    const seeCalendar = () => {
        navigate('/profile/calendar');
    }

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
        
        {ordered.length > 0 ? (
                    
            <Badge variant="dot"  color="secondary">
        <MailIcon/>
      </Badge>
      
          
            ) : (<MailIcon/>
       
            )}
      </>)
      }
  
  

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
        /* OrderService.getOrders().then(res => {
          setOrders(res);
        }) */
    }, []);


    
  return (
    <>
    
    <div>
        <Box>
        <Typography variant="h5">Current Month</Typography>
<section>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={calEvents}
        eventDisplay="background"
        eventClick={(info) => {handleEventClick(info)}}
        eventContent={renderEventContent}
      />
      </section>

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
      <p/>
      
     
        <Box justifyContent="flex-end">
        <Button  variant="contained" color="secondary"onClick={seeCalendar}>Create new Event</Button>
        </Box>
        </Box>
        
    
   </div> 
   </> 
  )
}

export default ShortCalendar