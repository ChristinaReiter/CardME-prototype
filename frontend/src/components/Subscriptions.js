import { useState, useEffect } from "react";
import SubscriptionService from "../services/SubscriptionService";
import SubscriptionItem from "./SubscriptionItem";
import { Box, Grid, Typography } from "@mui/material";

const Subscriptions = ({ setSelectedTab }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    setSelectedTab(2);
    SubscriptionService.getSubscriptions()
      .then((res) => {
        setSubscriptions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ pl: "25px", pt: "10px", pb: "20px" }}>
        My Subscriptions
      </Typography>
      <Box>
        {subscriptions.length > 0 ? (
          <div>
            <Grid sx={{ pl: "25px", pr: "25px" }} container spacing={2}>
              {subscriptions.map((subscription) => (
                <Grid key={subscription._id} item xs={12} md={6} lg={4}>
                  <SubscriptionItem
                    subscription={subscription}
                    changeSubscription={setSubscriptions}
                    allSubscriptions={subscriptions}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <Typography variant="h5" sx={{ pl: "25px", pr: "25px" }}>
            {" "}
            You have no Subscriptions{" "}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Subscriptions;
