
const express = require("express");
const app=express();
const db=require('./db'); 

const cors=require('cors'); //عشان يسمح باستخدام البيانات من مكان/ملف  ثاني 
const Todo=require('./todo'); 
const User=require('./User');

app.use(express.json())  //POST لل BODY علشان يقراء ال
app.use(cors())//استدعاء كورس عشان يسمح للملف بانو يقرا بي



//---------TODO ----------

app.get('/',(req,res)=>{
    res.json('GET....')
})

//عشان اطبع كل العناصر الي داخل GET
app.get("/tasks",(req,res)=>{
  
    Todo.find({},(err, date)=>{
        if (err) {
            console.log("ERROR: ", err);
        }else{
            res.json(date);
        }
    })
});

//ارجاع عناصر بقيمه محدده   
app.get("/filter",(req,res)=>{ 
    Todo.find({isCompleted : req.query.isCompleted },(err, date)=>{
        if (err) {
            console.log("ERROR: ", err);
        }else{
            res.json(date);
        }
    })
}); 


//عشان اضيف عناصر جديدهPOST 
app.post("/tasks",(req,res)=>{
  //app.use(express.json())-BODY علشان يقراء ال
  //Todo.create({title :'sleep', isCompleted:true },(err, newelem)=>{
  Todo.create(req.body,(err, newelem)=>{
        if (err) {
            console.log("ERROR: ", err);
        }else{

         res.status(201).json(newelem);
        }
    })
});

 //حذف  عنصر 
app.delete("/tasks/:id", (req, res) => {
 
  Todo.deleteOne({_id:req.params.id}, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      deleteObj.deleteCount === 1
       ?res.json(deleteObj ) 
       :res.status(404).json('NOT find' );
    }
  });
});

// حذف كل العناصر المنتهيه 
app.delete("/tasks", (req, res) => {
  Todo.deleteMany({isCompleted : true}, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      //res.json(deleteTask); 
      // زي فوق او تحت كلها تمام 
      // اذا كان موجود يطبعو اذا لا يطبع مو موجود 
      deleteObj.deleteCount ===0
       ?res.status(404).json('NOT find' )
       :res.json(deleteTask );
    }
  });
});

//تحديث  اسم  عنصر 
app.put("/tasks/:id", (req, res) => {
  Todo.updateOne(
    {_id:req.params.id}, //ID عشان اوصلو ب 
    {title:req.body.newTitle },   
   (err, updattasks) => {
    if (err) {
      res.status(400).json(err);
    } else {
    updattasks.modifiedCount === 1
       ?res.json(updattasks )
       :res.status(404).json('NOT find' ); 
    }
  });
});
 
//-----------------------------
// عرض العناصر غير المنتهيه
app.get("/tasks/:isCompleted",(req,res)=>{
    Todo.find({isCompleted : false },(err, date)=>{
        if (err) {
            console.log("ERROR: ", err);
        }else{
            res.json(date);
        }
    })
}); 



// تغيير قيمه المدخل 
app.put("/tasks/:id/:isCompleted", (req, res) => {
  Todo.updateOne(
    {_id:req.params.id}, //ID عشان اوصلو ب 
    {isCompleted:req.params.isCompleted }, 
   (err, updattask) => {
    if (err) {
      // console.log("ERROR: ", err);
      res.status(400).json(err);
    } else {
      //res.json(updattasks); 
    updattask.modifiedCount === 1
       ?res.json(updattask )
       :res.status(404).json('NOT find' ); 
    }
  });
});


//---------------- USER ----------

//انشاء مستخدم جديد 
app.post("/Users/register",(req,res)=>{
  User.create(req.body,(err, newuser)=>{
        if (err) {// يرجع رساله ان الايميل موجود قبل 
            res.status(400).json({ERROR:  "This email is taken "});
        }else{
         res.status(201).json(newuser);
        }
    })
});

 // التحقق من بيانات  المستخدم 
app.post("/Users/login",(req,res)=>{
  User.find({email:req.body.email},(err, newuser)=>{ // عشان اوصل للايميل 
      if (err) {
         console.log("ERROR: ", err);
      } else {
       // console.log(arrUserFound);
         if (newuser.length === 1) { //اتحقق من  وجود الايميل 
           if (req.body.password === newuser[0].password) {
          res.status(200).json({
           message: "Login Successfully",
           username: newuser[0].username,
             });
          } else {
           res.status(400).json({
           message: "Wrong password",
      });
    }
   } else {
    res.status(404).json({
      message: "The email entered is not registered",
      });
     }
    }
  });
 });


app.listen(5000,()=>{
    console.log('IS WORKING....')
});
  

