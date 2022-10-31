const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

const UserRoute = require("./usersRoute/app");
const ticketRoute = require("./ticketRouter/app");
const activityRoute = require("./ActivityTickets/app");
const formidable = require('express-formidable');

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
}

app.use(formidable())
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/activity', activityRoute)
app.use("/ticket", ticketRoute);
app.use("/users", UserRoute);
app.get("/", (req, res) => res.send("Hello World!"));

module.exports = app;
