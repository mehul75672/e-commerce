"use strict";
require('dotenv').config()
require("./db/config");
var cors = require("cors");
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/images')));

// app.get("/", (req, res) => {
//   res.status(200).send("welcome to home page");
// })

//all routes
const admin_routes = require("./routes/admin");
const user_routes = require("./routes/user");
const datas = require('./model/datas');

app.use(admin_routes);
app.use(user_routes);
require('./seeder/admin')
//app.get("/getdata",async(req,res)=>{
//   var dateArray = [];
//   var currentDate = moment(startDate);
//   var stopDate = moment(stopDate);
//   while (currentDate <= stopDate) {
//       dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
//       currentDate = moment(currentDate).add(1, 'days');
//   }
//   return dateArray;
//})
const PORT = process.env.port;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
});


app.all('*', function (req, res, next) {
  console.log('only applied for routes that begin with /api');
  return res.status(404).json({ error: "page not found" });
})





