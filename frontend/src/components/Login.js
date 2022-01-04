
import React, { useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";


export default function Login(props) {
     
    const [email, setEmail] = useState("tahani@g.com");
    const [password, setPassword] = useState("1234");
    const [loginStatus, setLoginStatus] = useState(null);
    const [loginMessage,setLoginMessage] = useState(" ");

    const login = (e) => 
        e.preventDefault();  
        const userInfo={
            email , 
            password  
        }
        axios
          .post(`http://localhost:5000/User/login`,userInfo)
          .then((response) => {
             setLoginStatus( response.status)
             setLoginMessage(response.data.message)
            // console.log('RESPONSE: ', response);
            console.log("DATA: ", response.data);
          //  setTasks(response.data);
          props.setLogin(true)
          props.setUserName(response.data.userName)
          })
          .catch((err) => {
            console.log("ERR: ", err);
            setLoginStatus(err.response.status)
            setLoginMessage(err.response.data.message)
          });
     

     
    return(
  
     <div class="mb-7 m-3" >
       <form  className="d-grid-3 m-7 d-flax-justify-content-center">
       <div class="form-floating m-3">
          <input type="email" class="form-control" id="floatingInput" 
           value={email}
           placeholder="Write email here ..."
           onChange={(e) => {
           setEmail(e.target.value);
             }}     />
         <label for="floatingInput">Email address</label>
       </div>

 <div class=" m-3 form-floating">
   <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={email}
         value={password}
         onChange={(e) => {
         setPassword(e.target.value);
           }}/>
   <label for="floatingPassword" value="Login">Password</label>
  </div>

{loginStatus ===200 && ( <div class="alert alert-success" role="alert">
    {loginMessage}
</div>)}

{(loginStatus === 400  || loginStatus ==404 )&& ( <div class="alert alert-success" role="alert">
    {loginMessage}
  </div>)}

    < button className="m-3 fs-6 " onClick={login}> login </ button >
   <p> YOU DONT HAVE ACCOUNT <Link to="/Register"> GO REGISTER</Link></p>
</form>

</div>

 ); };
