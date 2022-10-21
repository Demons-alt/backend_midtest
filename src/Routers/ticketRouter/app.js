const express = require("express");
const ticketRoute = express.Router();
const AuthToken = require('../../middleware/AuthToken');
const {
  AddTicket,
  AllTickets,
  DeleteOneTicket,
  OneTicket,
  GetSummary,
  updateStatus,
} = require("../../Controllers/TicketController");

ticketRoute.post("/add", AddTicket);
ticketRoute.get('/summary',AuthToken,GetSummary)
ticketRoute.put("/update/:ticketId",AuthToken, updateStatus);
ticketRoute.delete("/delete/:ticketId",AuthToken, DeleteOneTicket);
ticketRoute.get("/data/:ticketId",AuthToken, OneTicket);
ticketRoute.get("/all",AuthToken, AllTickets);
ticketRoute.get("/", (req, res) => {
  res.send("This is work :)");
});

module.exports = ticketRoute;
