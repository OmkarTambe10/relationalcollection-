const express = require("express");
const app = express();
const port = 9000;
const mongoose = require("mongoose"); //NoSQL database
var bodyParser = require('body-parser');
var categoryRoute = require("./routes/category.js");
var productRoute = require("./routes/product.js");
//connection of server on port no.9000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use("/route/category", categoryRoute);
app.use("/route/product", productRoute);


//connection of NoSQL database
mongoose.connect('mongodb://127.0.0.1/dashboard', { useUnifiedTopology: true, useNewUrlParser: true }, function(error, db){
    if(error){
        console.log(error);
    }else{
        app.listen( port, function(){
            console.log("Connected to port " + port );
        });    
    }
});
module.exports = app;