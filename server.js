const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { mongodburi, port_number } = require("./src/core/config");
const cookieParser = require('cookie-parser')
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());

const userRoute = require('./src/Router/userRoute')
const paystack = require('./src/Router/paystackRoute')

app.use('/api',userRoute)
app.use('/api/pay',paystack)
app.get('/', (req,res) => {
    res.render('index')
})
const port = process.env.PORT || port_number;
mongoose
  .connect(mongodburi)
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)));

