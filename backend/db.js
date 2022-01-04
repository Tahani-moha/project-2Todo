const mongoose= require('mongoose'); //تصدير مونقووز


const dbURL= "mongodb://localhost:27017/TodoList"; //تفاصيل اللنك/اسم المشروع 

mongoose.connect(dbURL); // الشبك علي اللنك 

const db =mongoose.connection; //اتاكد ادا متصل 

db.on("error",(err)=>{
    console.log("ERROR ")  //اذا فيه غلط يطبع 
});

db.on("connected",(err)=>{
    console.log("CONNECTED...")// اذا تمام يطبع 
})
