const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const config = require("./src/config");
const product = require("./src/routes/product");

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

app.get("/", (req, res) => {
  res.json({ response: "Hello World" });
});

app.use("/products", product);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
