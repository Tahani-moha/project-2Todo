 //انشاء سكيما 

const {Schema, model}= require("mongoose"); 

const todoSchema =new Schema({
    title:'string', 
    isCompleted:Boolean 
})

// model

const Todo=model('Todo',todoSchema)

module.exports=Todo
