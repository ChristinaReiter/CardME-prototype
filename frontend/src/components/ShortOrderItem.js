import { useState, useEffect } from 'react'
import { Typography, Button, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Paper } from '@mui/material'
import OrderService from '../services/OrderService'
import { useNavigate } from 'react-router-dom';

function ShortOrderItem() {

const [orderNr, setOrderNr] = useState('');
const [orderDate, setOrderDate] = useState('');
const [orderStatus, setOrderStatus] = useState('');
const [orderTotal, setOrderTotal] = useState('');
const [orderRecipient, setOrderRecipient] = useState('');
const [orderNr2, setOrderNr2] = useState('');
const [orderDate2, setOrderDate2] = useState('');
const [orderStatus2, setOrderStatus2] = useState('');
const [orderTotal2, setOrderTotal2] = useState('');
const [orderRecipient2, setOrderRecipient2] = useState('');

const navigate = useNavigate();

useEffect(() => {
  OrderService.getOrders().then(res => {
      
      if (res.length > 0) {
          setOrderNr(res[0]._id);
          setOrderDate(res[0].deliveryDate.split('T')[0]);
          setOrderStatus(res[0].status);
          setOrderTotal(res[0].total);
          setOrderRecipient(res[0].recipientName);        
      }
        if (res.length > 1) {
            setOrderNr2(res[1]._id);
            setOrderDate2(res[1].deliveryDate.split('T')[0]);
            setOrderStatus2(res[1].status);
            setOrderTotal2(res[1].total);
            setOrderRecipient2(res[1].recipientName);     
      }
    
      //console.log(res)
      
  })
}, []); 

const seeOrders = () => {
    navigate('/profile/orders');
}
    
  return (
    <>
    
    <div>
        <Typography variant="h5">Recent Orders</Typography>
        <hr />
    <TableContainer>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Order Nr</TableCell>
            <TableCell >Delivery on</TableCell>
            <TableCell >Recipient</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Total</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell >{orderNr}</TableCell>
            <TableCell >{orderDate}</TableCell>
            <TableCell >{orderRecipient}</TableCell>
            <TableCell >{orderStatus}</TableCell>
            <TableCell >{orderTotal}€</TableCell>
         
          </TableRow>
          <TableRow>
            <TableCell >{orderNr2}</TableCell>
            <TableCell >{orderDate2}</TableCell>
            <TableCell >{orderRecipient2}</TableCell>
            <TableCell >{orderStatus2}</TableCell>
            <TableCell >{orderTotal2}€</TableCell>
     
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <p/>

    <Button  variant="contained" color="secondary"onClick={seeOrders}>View all Orders</Button>
        
    
   </div> 
   </> 
  )
}

export default ShortOrderItem