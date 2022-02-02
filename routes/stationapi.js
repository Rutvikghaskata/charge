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
router.post('/station/signup',async (req,res)=>{
   

       const { ownerName,chargingStation,address,city,pincode,state,plugs,openingTime,closeTime} = req.body;   
   
       try{
      
       const station = new Station({ownerName,chargingStation,address,city,pincode,state,plugs,openingTime,closeTime}); 
       station.save();
       const token = jwt.sign({userId:station._id},jwtKey)
       res.send({token})
      

    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})
module.exports= router