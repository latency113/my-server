const express = require('express');
const app = express();
//get port number from environment settings
require('dotenv').config({ path: './config.env'});
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const productRoute = require('./routes/product.route')
const customerRoute = require('./routes/customer.route')

app.use(cors());//cross origin resource sharing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// match localhost:4000/
app.get('/',(req,res)=>{
    res.send("สวัสดี");
});

app.use("/products", productRoute)
app.use("/customers", customerRoute)

app.listen(port, () => {
    console.log('App started at port: ' + port);
});