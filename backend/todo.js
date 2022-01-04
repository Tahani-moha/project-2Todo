 //انشاء سكيما 
 // نصدر المونقوز .. ناخذ منها السكيما,مودل

const {Schema, model}= require("mongoose"); 

// انشاء سكيما 
const todoSchema =new Schema({
    title:'string',// اوبجكت  عنوان : القيمه
    isCompleted:Boolean //الحاله : القيمه
})

// model
// ناخذ موديل من السكيما 
//       اسم السكيما --اسم المودل 
const Todo=model('Todo',todoSchema)

// اصدر المورل 
module.exports=Todo
// استوردها في ملف السيفر
