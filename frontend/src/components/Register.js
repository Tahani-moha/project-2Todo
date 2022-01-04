import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
export default function Register(){  

  const [email, setEmail] = useState("ai@g.com");
  const [password, setPassword] = useState("1234");
  const [username, setUsername] = useState("ai ");
  
  
  
  const Register = (e) => {
    // should bring data using axios
    // from backend (GET /tasks) 
    e.preventDefault(); // يقفل التحديث التلقلئي للصفحه 
    const nameUser={
    //اكتبها بنفس الطريقه الي في (بوست مان) هي تلقائي ترسل و تحفظ البيانات 
        username,
        email , 
        password  
    }
    axios
      .post(`http://localhost:5000/User/register`,nameUser)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
      //  setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };


 
   

   return(     

<div class="mb-3">

  <form>
  <div class="form-floating m-3">
      <input type="name" class="form-control" id="floatingInput"
       
       placeholder="Write your name here ..."
       onChange={(e) => {
         setUsername(e.target.value);
       }}
       value={username}
      />
       <label for="floatingInput">User Name</label>
    </div>
    <div class="form-floating m-3">
      <input type="email" class="form-control" id="floatingInput"
       type="email"
       placeholder="Write email here ..."
       onChange={(e) => {
         setEmail(e.target.value);
       }}
       value={email}
      />
       <label for="floatingInput">Email address</label>
    </div>

  <div class=" m-3 form-floating">
    <input class="form-control" id="floatingPassword"
     type="password"
          placeholder="Write password here ..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}/>
    <label for="floatingPassword">Password</label>
  </div>
  <div class="form-floating mb-3">
  <div class="col-12">
    <button className="m-3 fs-6 " type="submit"  onClick={Register}>Sign in</button>
  </div>
   <p> YOU HAVE AN ACONT GO <Link to="/Login"> LOGIN</Link> </p> 
  </div>  
     </form>
  </div>
  )
 }

 /*
   
 // الكود القديم 
 <form>
          <label htmlFor= 'name'> Name:</label>
          <input
          type="text"
          placeholder="Write username here ..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username} />
            <br/>
            <label htmlFor= 'email'> Email:</label>
           <input  
          type="email"
          placeholder="Write email here ..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
             <br/>
          <label htmlFor= 'password'> Password:</label>
          <input
          type="password"
          placeholder="Write password here ..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
              <br/>  
                <button onClick={Register}> Register </ button>

                <br/>
                <Link to="/Login">LOGIN</Link>
                </form>
                  */