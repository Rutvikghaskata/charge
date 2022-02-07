const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000;
const mongoUrl='mongodb+srv://evspoint:donttouch1807@evspoint.sgihu.mongodb.net/evspoint'

require('./models/user');   

const userToken = require('./middleware/userToken')
const ownerToken = require('./middleware/ownerToken')
const bookingToken = require('./middleware/bookingToken')
const authRoutes = require('./routes/userapi')
const ownerRoutes = require('./routes/ownerapi')
const stationRoutes = require('./routes/stationapi')
const bookingRoutes = require('./routes/bookingapi')
const helpRoutes = require('./routes/helpapi')
app.use(bodyParser.json())
app.use(authRoutes)
app.use(ownerRoutes)
app.use(stationRoutes)
app.use(bookingRoutes)
app.use(helpRoutes)


mongoose.connect(mongoUrl,{
})
.then(() =>{
    console.log('connection-successful');
})
.catch((err) =>console.log('no connection'));

app.get('/',userToken,(req, res) =>{
    res.send({userId:req.user._id,firstName:req.user.firstName,lastName:req.user.lastName,email:req.user.email,contactNo:req.user.contactNo}); 
})
app.get('/book',bookingToken,(req, res) =>{
    res.send({BookingId:req.booking._id,FirstName:req.booking.FirstName,LastName:req.booking.LastName,Email:req.booking.Email,ContactNo:req.booking.ContactNo,City:req.booking.City,State:req.booking.State,Car:req.booking.Car,plug:req.booking.plug,Date:req.booking.Date,Time:req.booking.Time,Payment:req.booking.Payment}); 
})

app.get('/owner',ownerToken,(req, res) =>{
    res.send({ownerId:req.owner._id,firstName:req.owner.firstName,lastName:req.owner.lastName,email:req.owner.email,contactNo:req.owner.contactNo});
})
                

app.listen(port ,()=>{
    console.log(`server is running on ${port}`);
})