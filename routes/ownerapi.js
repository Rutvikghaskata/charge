const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const emailValidator = require("email-validator");
const jwtKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJpYXQiOjE2Mzk3MzQ3NTV8.bHygAPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo"
const router = express.Router();
require("../models/owner")
const Owner = mongoose.model('owner')

router.post('/owner/signup',async (req,res)=>{  
    try { 
       const newOwner = new Owner({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       contactNo: req.body.contactNo,
       password: CryptoJS.AES.encrypt(
         req.body.password,
         PASS_SEC
       ).toString(),
       confirmPassword: CryptoJS.AES.encrypt(
         req.body.confirmPassword,
         PASS_SEC
       ).toString(),
     });
     const hashedPassword = CryptoJS.AES.decrypt(
       newOwner.password,
       PASS_SEC
     );
     const hashedConfirmPassword = CryptoJS.AES.decrypt(
       newOwner.confirmPassword,
       PASS_SEC
     );
     const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
     const originalConfirmPassword = hashedConfirmPassword.toString(CryptoJS.enc.Utf8);
    
     if(emailValidator.validate(req.body.email)){
       if(originalPassword!==originalConfirmPassword){
         res.status(400).send('password and confirm password are not match!')
       }
       else{ 
       newOwner.save();
       const token = jwt.sign({OwnerId:newOwner._id},jwtKey)
       res.send({token})
       }
      }else{
         res.status(400).send('Invalid Email');
     }
     } catch (err) {
       res.status(500).json(err.message);
     }
   });
    
    


router.post('/owner/signin', async (req, res) => {
       try{
              const user = await Owner.findOne(
                {
                  contactNo: req.body.contactNo
                }
            );
            
            const hashedPassword = CryptoJS.AES.decrypt(
              user.password,
              PASS_SEC
            );
            
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            console.log(originalPassword);
            console.log(req.body.password);
            const inputPassword = req.body.password;
            
            if(!user){
              res.status(401).json("User are not found");
             }else{
               if(originalPassword === inputPassword){
                const token = jwt.sign({userId:user._id},jwtKey)
                res.status(200).json({token});    
               }
               else{
                res.status(401).json("Wrong Password");
               }
             }         
            }catch(err){
              res.status(500).json(err.message);
            }
            })
    
module.exports = router