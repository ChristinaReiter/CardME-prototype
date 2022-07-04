const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");

const config = require("./src/config");
const product = require("./src/routes/product");
const order = require("./src/routes/order"); 
const register = require("./src/routes/auth");
const login = require("./src/routes/auth");

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

app.use("/", register)

app.use("/order", order);

app.use("/", login)

app.use("/public", express.static("public"));

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});


 