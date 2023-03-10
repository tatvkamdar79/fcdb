require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/mongoose");
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 8080;

app.set("port", PORT);

// Parsing the request parameters
app.use(express.urlencoded());
app.use(express.static('./assests'));

//Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//Use express router 
app.use('/',require('./routes/index.js'));

app.listen(PORT, () => {
  console.log("Yay");
});
