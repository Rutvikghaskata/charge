const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({ 
     
     UserId:{
          type:String,
          required:true
      },
     FirstName:{
          type:String,
          required:true,
     },
     LastName:{
          type:String,
          required:true,
     },
     ContactNo:{
          type:Number,
          required:true,
     },
     Email:{
          type:String,
          required:true,
     },
     City:{
          type:String,
          required:true,
     },
     State:{
          type:String,
          required:true,
     },
     Car:{
          type:String,
          required:true,
     },
     Plug:{
          type:String,
          required:true,
     },
     Date:{         
          type:Date,
          required:true,
     }, 
     Time:{
          type:String,
          required:true
     },
     Payment:{
          type:String,
          default:"Pending"
     }
     
})

mongoose.model('booking',bookingSchema);