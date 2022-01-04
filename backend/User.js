 //انشاء سكيما 
 // نصدر المونقوز .. ناخذ منها السكيما,مودل

 const {Schema, model}= require("mongoose"); 

 // انشاء سكيما 
 const usreSchema =new Schema({
     userName: String ,// اوبجكت  عنوان : القيمه
     email:{ type: String, required: true , unique: true}, //و ان قيمه الايميل مو متكرره  الحاله : القيمه
     password :{ type: String, required: true},
    })

 
 // model
 // ناخذ موديل من السكيما 
 //       اسم السكيما --اسم المودل 
 const User=model( "User" ,usreSchema)
 
 // اصدر المورل 
 module.exports=User 
 // استوردها في ملف السيفر 
 
 
 