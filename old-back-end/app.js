const express = require ("express")
const bodyParser = require("body-parser")
const cors = require('cors');

const fs = require("fs");

//create express app
const app = express()

app.use(cors());

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//route
const routes = require("./Routes")
app.use('/',routes)

//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
})