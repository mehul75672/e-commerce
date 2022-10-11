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

//all routes
const adminroutes = require("./routes/admin");
const userroutes = require("./routes/user");

app.use(adminroutes);
app.use(userroutes);
require('./seeder/admin')

app.get("/", (req, res) => {
  res.status(200).send("welcome to home page");
})

const PORT = process.env.port;
app.listen(PORT, process.env.HOSTNAME, () => {
  console.log(`Server running at http://${process.env.HOSTNAME}:${PORT}`)
});

app.all('*', function (req, res, next) {
  console.log('only applied for routes that begin with /api');
  return res.status(404).json({ error: "page not found" });
})
