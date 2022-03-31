const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const routes = require("./routes/Routes");

// create express app
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/ipl", routes);

app.listen(1887, () => console.log("Server started port number 1887"));
