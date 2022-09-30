"use strict";
require('dotenv').config()
require("./db/config");
var cors=require("cors");
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
const category=require("./routes/category");
const banner=require("./routes/banner");
const brands=require("./routes/brands");
const product = require('./routes/product');
const wrapper = require('./routes/Wrapper');
const user = require("./routes/user");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/images')));


//  const NODE_IMAGE_PATH = path.join(__dirname, "public/images")
// app.get("/:image", (req, res) =>
// res.sendFile(
//     path.resolve(
//         NODE_IMAGE_PATH,
//         req.params.image
//     )
// )
// );

app.use("/api/category",category);
app.use("/api/banner",banner);
app.use("/api/brands",brands);
app.use("/api/product",product);
app.use('/api/wrapper',wrapper);
app.use("/user", user);
app.get("/",(req,res)=>{
   res.status(200).send("hello");
 }) 

const HOSTNAME = '192.168.29.118';
const PORT=process.env.port;
app.listen(PORT,HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`)
});
