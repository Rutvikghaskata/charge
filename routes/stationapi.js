const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const jwt = require('jsonwebtoken')
const jwtKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJpYXQiOjE2Mzk3MzQ3NTV1.bHygAPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo"
require("../models/station")
const Station = mongoose.model('station')


router.get('/station',(req,res)=>{
    Station.find().then((data)=>{
           res.status(200).json(data);
    })   
})



router.post('/addStation',async (req,res)=>{
   
       const { ownerId,ownerName, StationName,ContactNo,address,city,pincode,state,plug1,Plug2,openingTime,closeTime,Latitude,Longitude,Image,rating,review,Location} = req.body;   
   
       try{
      
       const station = new Station({ownerId,ownerName, StationName,ContactNo,address,city,pincode,state,plug1,Plug2,openingTime,closeTime,Latitude,Longitude,Image,rating,review,Location}); 
       station.save();
       const token = jwt.sign({userId:station._id},jwtKey)
       res.send({station})
      

    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})
module.exports= router