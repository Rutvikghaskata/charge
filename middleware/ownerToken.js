const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require("../models/owner")
const Owner = mongoose.model('owner')
const jwtKey = "eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ8.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV8.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo";

module.exports = (req,res,next)=>
{
  const { authorization } = req.headers;
  //authorization === Bearer sfafsafa
  if(!authorization){
      return res.status(401).send({error:"you must be logged in"})
  }
  const tokens = authorization.replace("Bearer ","");
  jwt.verify(tokens,jwtKey,async (err,payload)=>{
      if(err){
        return  res.status(401).send({error:"you must be logged in 2"})
      }
   const {ownerId} = payload;
   const owner = await Owner.findById(ownerId)
   req.owner=owner;
   next();
  })
}