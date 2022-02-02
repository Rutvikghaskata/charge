const mongoose = require('mongoose');
const stationSchema = new mongoose.Schema({
    
    ownerName:
    {
        type:String,
        required:true,
        
    },
    chargingStation:{
        type:String,
        required:true
    },
    address:{
        type:String,
        unique:true,
        required:true
    },
    city:{
        type:String,
        required:true,
      
    },
    pincode:{
        type:Number,
        required:true,
    },
    state:{
        type:String,
        required:true
    },
    plugs:{
        type:String,
        required:true
    },
    openingTime:{
        type:String,
        required:true
    },
    closeTime:{
        type:String,
        required:true
    },

})
mongoose.model('station',stationSchema);