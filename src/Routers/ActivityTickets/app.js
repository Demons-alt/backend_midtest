const express = require("express");
const activityRoute = express.Router();
const AuthToken = require('../../middleware/AuthToken');
const {
  AddActivity,
  AllActivitys,
  OneActivity,
  DeleteOneActivity
} = require("../../Controllers/ActivityController");

activityRoute.post("/add", AddActivity);
// activityRoute.put("/update/:activityId");
activityRoute.delete("/delete/:activityId", DeleteOneActivity);
activityRoute.get("/data/:activityId", OneActivity);
activityRoute.get("/all", AllActivitys);
activityRoute.get("/", (req, res) => {
  res.send("This is work :)");
});

module.exports = activityRoute;
