const mongoose= require('mongoose');

const dbURL= "mongodb://localhost:27017/TodoList"; //تفاصيل اللنك/اسم المشروع 

mongoose.connect(dbURL); 

const db =mongoose.connection; 

db.on("error",(err)=>{
    console.log("ERROR ") });

db.on("connected",(err)=>{
    console.log("CONNECTED...");
});
