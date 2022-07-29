import { useState, useEffect } from "react";
import OrderService from "../services/OrderService";
import OrderItem from "./OrderItem";
import { Box, Grid, Typography } from "@mui/material";

const Orders = ({ setSelectedTab }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setSelectedTab(1);
    OrderService.getOrders()
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ pl: "25px", pt: "10px", pb: "20px" }}>
        My Orders
      </Typography>

      <Box>
        {orders.length > 0 ? (
          <div>
            <Grid sx={{ pl: "25px", pr: "25px" }} container spacing={2}>
              {orders.map((order) => (
                <Grid key={order._id} item xs={12} md={6} lg={4}>
                  <OrderItem order={order} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <Typography variant="h5" sx={{ pl: "25px", pr: "25px" }}>
            {" "}
            You have no Orders{" "}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Orders;
