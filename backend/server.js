
const express = require("express");// استيراد ملف اكسبرس 
const app=express();
const db=require('./db'); //استيراد ملف 
//const todo = require("./todo");
const cors=require('cors'); //عشان يسمح باستخدام البيانات من مكان/ملف  ثاني 
const Todo=require('./todo');// استيراد  ملف المودل
const User=require('./User');// استيراد  ملف المودل
//const { find } = require("./todo");

app.use(express.json())  //POST لل BODY علشان يقراء ال
app.use(cors())//استدعاء كورس عشان يسمح للملف بانو يقرا بي



//---------TODO ----------
/*
const arrServer = [
  {
    _id: "61c420a96096f17c23ba1ab7",
    title: "444444444",
    isCompleted: false,
    __v: 0,
  },
  {
    _id: "61c420ac6096f17c23ba1abd",
    title: "5555555555555",
    isCompleted: true,
    __v: 0,
  },
];*/


app.get('/',(req,res)=>{
    res.json('GET....')
})

//عشان اطبع كل العناصر الي داخل GET
app.get("/tasks",(req,res)=>{
  //find يبحث عن العناصر -
  // اخليه فاضي عشان يطبع كل البيانات 
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
  // find يبحث عن العناصر -
  // بعدها القيمه الي ابحث عنه-req.query-اخليها تفلتر البيانات توصلل لبيانات عن طريق   
  // في البوس مان اكتب http://localhost:5000/filter
 // كتب اسم الكي و القيمه الي ادورهاي kay & value -تحت في  
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
  //post يضيف  العناصر -
  //app.use(express.json())-BODY علشان يقراء ال
 //اكتبها كذا 
  Todo.create({title :'sleep', isCompleted:true },(err, newelem)=>{
  //POSTMAN او كذا واضيف التغيير على 
  //Todo.create(req.body,(err, newelem)=>{
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
      //res.json(deleteTask); 
      // زي فوق او تحت كلها تمام 
      // اذا كان موجود يطبعو اذا لا يطبع مو موجود 
      deleteObj.deleteCount === 1
       ?res.json(deleteObj )// اسم العنصر المحذوف 
       :res.status(404).json('NOT find' );
    }
  });
});

// حذف كل العناصر المنتهيه 
app.delete("/tasks", (req, res) => {
 // فلتر العناصر حسب القيمه المطلوبه 
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
    {title:req.body.newTitle }, // و اكتب الاسم الجديد postman اكتبو داخل   newTitle علشان اصل للعنوان -   
   (err, updattasks) => {
    if (err) {
     // console.log("ERROR: ", err);
      res.status(400).json(err);
    } else {
      //res.json(updattasks);
      // اذا كان موجود يطبعو اذا لا يطبع مو موجود 
    updattasks.modifiedCount === 1
       ?res.json(updattasks )
       :res.status(404).json('NOT find' ); 
    }
  });
});
 
//-----------------------------
// عرض العناصر غير المنتهيه
app.get("/tasks/:isCompleted",(req,res)=>{
  //find يبحث عن العناصر -
    Todo.find({isCompleted : false },(err, date)=>{
        if (err) {
            console.log("ERROR: ", err);
        }else{
            res.json(date);
        }
    })
}); 



// تغيير قيمه المدخل 
// اكتب زمر العنصر و القيمه الجديده الجديد
app.put("/tasks/:id/:isCompleted", (req, res) => {
  Todo.updateOne(
    {_id:req.params.id}, //ID عشان اوصلو ب 
    // و اكتب زمر العنصر و القيمه الجديده الجديد postman اكتبو داخل   newTitle علشان اصل للعنوان -   
   //http://localhost:5000/tasks/61c3bcd6e876a843852f7c90/true
    {isCompleted:req.params.isCompleted }, 
   (err, updattask) => {
    if (err) {
      // console.log("ERROR: ", err);
      res.status(400).json(err);
    } else {
      //res.json(updattasks);
      // اذا كان موجود يطبعو اذا لا يطبع مو موجود 
    updattask.modifiedCount === 1
       ?res.json(updattask )
       :res.status(404).json('NOT find' ); 
    }
  });
});
//--------- USER ----------

//انشاء مستخدم جديد 
app.post("/Users/register",(req,res)=>{
  //post يضيف  العناصر -
  //app.use(express.json())-BODY علشان يقراء ال
 //اكتبها كذا 
  //POSTMAN او كذا واضيف التغيير على 
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
  //post يضيف  العناصر -
  //app.use(express.json())-BODY علشان يقراء ال
 //اكتبها كذا 
  //POSTMAN او كذا واضيف التغيير على 
  User.find({email:req.body.email},(err, newuser)=>{ // عشان اوصل للايميل 
      if (err) {
         console.log("ERROR: ", err);
      } else {
       // console.log(arrUserFound);
         if (newuser.length === 1) { //اتحقق من  وجود الايميل 
       //   اذا موجود اتحقق من كلمه المرور
           if (req.body.password === newuser[0].password) {
      //   اذا كلمه المرور صح 
          res.status(200).json({
           message: "Login Successfully",
           username: newuser[0].username,
             });
          } else {
       // اذا كلمه المرور خطاء
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
  


// كود لاستاذ 
/*
const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db");
const Todo = require("./todo");
const User = require("./user");
// console.log(Todo);

app.use(express.json());
app.use(cors());

// use uuid and array if mongoDB didn't work for you
const arrServer = [
  {
    _id: "61c420a96096f17c23ba1ab7",
    title: "444444444",
    isCompleted: false,
    __v: 0,
  },
  {
    _id: "61c420ac6096f17c23ba1abd",
    title: "5555555555555",
    isCompleted: true,
    __v: 0,
  },
];

app.get("/", (req, res) => {
  res.json("GET / is Working");
});

// CRUD: Create, Read, Update, Delete

app.get("/tasks", (req, res) => {
  // use this if mongoDB didn't work for you
  // res.json(arrServer);

  Todo.find({}, (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.json(data);
    }
  });
});

//              ?key=value&key=value
app.get("/filter", (req, res) => {
  console.log(req.query);
  Todo.find({ isCompleted: req.query.isCompleted }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

app.post("/tasks", (req, res) => {
  // console.log('25:',req.body);

  Todo.create(req.body, (err, newTask) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.status(201).json(newTask);
    }
  });
});

app.delete("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);

  Todo.deleteOne({ _id: req.params.id }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      deleteObj.deletedCount === 1
        ? res.json("Delete one todo successfully")
        : res.status(404).json("This todo is not found");
    }
  });
});

app.delete("/tasks", (req, res) => {
  // console.log("37:", req.params.id);

  Todo.deleteMany({ isCompleted: true }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log(deleteObj);
      deleteObj.deletedCount === 0
        ? res.status(404).json("There is no completed todo found")
        : res.json("Delete all completed todos successfully");
    }
  });
});

app.put("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);
  Todo.updateOne(
    { _id: req.params.id },
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("Update one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    }
  );
});

app.put("/tasks/:id/:isCompleted", (req, res) => {
  console.log("124:", req.params);
  Todo.updateOne(
    { _id: req.params.id },
    { isCompleted: req.params.isCompleted },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("Update one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    }
  );
});

// USER
app.post("/users/register", (req, res) => {
  User.create(req.body, (err, newUser) => {
    if (err) {
      // console.log("ERROR: ", err);
      res.status(400).json({ message: "This email already taken" });
    } else {
      // res.status(201).json(newUser);
      res.status(201).json({ message: "Create New User Successfully" });
    }
  });
});
*/