const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const emailValidator = require("email-validator");
const jwtKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJpYXQiOjE2Mzk3MzQ3NTV8.bHygAPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo"
const router = express.Router();
require("../models/owner")
const Owner = mongoose.model('owner')

router.post('/owner/signup',async (req,res)=>{
   
    const {firstName,lastName,email,contactNo,password,confirmPassword} = req.body;   
    try{
      
      const owner = new Owner({firstName,lastName,email,contactNo,password,confirmPassword});

      if(emailValidator.validate(req.body.email)){ 
       if(owner.password !== owner.confirmPassword){
          res.status(400).send('password and confirm password are not match!')
       } 
       owner.save();
       const tokens = jwt.sign({ownerId:owner._id},jwtKey)
       res.send({tokens})
      }else{
         res.status(400).send('Invalid Email');
     }

    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})

router.post('/owner/signin', async (req, res) => {
    const {contactNo,password} = req.body
    if(!contactNo || !password){
           return res.status(422).send({error : "must provide email or password"})
    }
    const owner = await Owner.findOne({contactNo})
    if(!owner){
           return res.status(422).send({error : "user not found"})
    }
    try{
           await owner.comparePassword(password);
           const token = jwt.sign({ownerId:owner._id},jwtKey)
           res.send({token})
    }catch(err){
           return res.status(422).send({error : "password are not same"})
    }
    
})








module.exports = router