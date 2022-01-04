
const {Schema, model}= require("mongoose"); 

 // انشاء سكيما 
 const usreSchema =new Schema({
     userName: String ,
     email:{ type: String, required: true , unique: true}, 
     password :{ type: String, required: true},
    })

 
 // model
 
 const User=model( "User" ,usreSchema)
 

 module.exports=User 

 
 
 