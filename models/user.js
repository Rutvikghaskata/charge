const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    
    firstName:{
        type:String,
        required:true
        
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    contactNo:{
        type:Number,
        unique:true,
        required:true,
      
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
})

// userSchema.pre('save',function(next){
//     const user = this;
//     if(!user.isModified('password','confirmPassword')){
//         return next()
//     }
//     bcrypt.genSalt(10,(err,salt)=>{
//         if(err){
//             return next(err)
//         }
//      bcrypt.hash(user.password,salt,(err,hash)=>{
//          if(err){
//              return next(err)
//          }
//          user.password = hash;
//          user.confirmPassword = hash;
//          next()
//      })    
//     })
//      }
//     )

userSchema.methods.comparePassword = function(candidatePassword) {
   
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            console.log(candidatePassword)
            console.log(user.password)
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
            
        })
    })

}

 mongoose.model('User',userSchema);

