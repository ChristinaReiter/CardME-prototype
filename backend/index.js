const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");

const config = require("./src/config");

const product = require("./src/routes/product");
const auth = require("./src/routes/auth");
const order = require("./src/routes/order"); 
const subscription = require("./src/routes/subscription");
const calendarEvent = require("./src/routes/calendarEvent");
const favorite = require("./src/routes/favorite");
const acquaintance = require("./src/routes/acquaintance");

mongoose.connect(config.mongoURI).then(
  () => {
    console.log("Database connected ");
  },
  (error) => {
    console.log("Database not connected : " + error);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
const port = config.port;

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json())
app.get("/", (req, res) => {
  /* res.json({ response: "Hello World" }); */
  res.send('hello world')
});

app.use("/products", product);

app.use("/", auth) 

//app.use("/order", order);

app.use("/", order) // Might not work 

app.use("/profile/subscriptions", subscription);

app.use("/profile/calendar", calendarEvent);

app.use("/profile/favorites", favorite);

app.use("/profile/contacts", acquaintance);



app.use("/public", express.static("public"));


app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});


 