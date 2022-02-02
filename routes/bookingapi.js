
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const jwt = require('jsonwebtoken')
const jwtKey = "eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV2.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo"
require("../models/booking")
const Booking = mongoose.model('booking')

router.get('/booking/:userId', async (req,res)=>{
    try{
          
          const orders = await Booking.find({ UserId: req.params.userId});
          res.status(200).json(orders);
      }
    catch(err)
      {
          res.send(err.message)
      }
})
router.post('/user/booking',async (req,res)=>{
   
  const {UserId,FirstName, LastName, ContactNo,Email,City, State, Car,Plug,Date,Time} = req.body;   
  try{  
       const booking = new Booking({UserId,FirstName, LastName, ContactNo,Email,City, State, Car,Plug,Date,Time}); 
       booking.save();
      //  const token1 = jwt.sign({bookingId:booking._id},jwtKey)
      //  res.send({token1})
 }catch(err){
   return res.status(422).send(err.message)
 } 
})

router.put('/update/payment',async(req,res)=>{
  
  
  try{
    const BookingId = req.body.BookingID
    const payment = req.body.Payment
    const booking = await Booking.findByIdAndUpdate(BookingId,{ $set:{Payment:payment}},{ new: true });
    
    booking.save()
    res.status(200).json(booking);
  }
  catch(err){
    res.status(500).json(err.message);
  }

})





module.exports= router