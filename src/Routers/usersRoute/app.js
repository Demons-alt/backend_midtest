const express = require("express");
const UserRoute = express.Router();
const AuthToken = require('../../middleware/AuthToken');
const {
  Register,
  Login,
  GetProfile,
  LogOut,
} = require("../../Controllers/UserController");

UserRoute.post("/register", Register);
UserRoute.post("/login", Login);
UserRoute.delete('/logout', LogOut)
UserRoute.get("/profile/:UserId", AuthToken ,GetProfile);
// UserRoute.put('/update/:emailUser', updateOne)
// UserRoute.get('/data/:emailUser', OneUser)
// UserRoute.get('/all', AllUser)
UserRoute.get("/", (req, res) => {
  res.send("This is work :)");
});

module.exports = UserRoute;


const dump = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7ImVtYWlsIjoiZmFobWlAZ21haWwuY29tIiwidXNlcl9pZCI6N31dLCJpYXQiOjE2NjYyODMyNTJ9.DD6krksp5lSwA2J3a-Gd7-dcZHLRc0IHS9IDclWTprk'