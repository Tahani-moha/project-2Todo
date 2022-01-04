
import React, { useState , useEffect } from "react"; // استدعاء الرياكت و اليوز ستسيت 
import "./App.css" ; // استدعا التنسيق 

import axios from "axios";//عشان اقدر اقراء البيانات داخل الباك اند 
import { Routes, Route, Link } from "react-router-dom";

import Todo from "./components/Todo";
import Add from "./components/Add"; 
import Login from "./components/Login";
import Register from "./components/Register"

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [login, setLogin ] = useState(false);
  const [username, setUserName] = useState("");
  
  useEffect(() => {getData();}, []);//يحدث الصفحه تلقايي

 //داله تجيب كل البيانات و تحفظها 
 // استدعيها في زر 
  const getData = () => {
  axios
    .get(`http://localhost:5000/tasks`)
    .then((response) => {
      // console.log('RESPONSE: ', response);
      console.log("DATA: ", response.data);
      setTasks(response.data);
      //getData();
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
 };

 const postNewTitle= (body)=>{
   axios
    .post(`http://localhost:5000/tasks`,body)
    .then((response) => {
      // console.log('RESPONSE: ', response);
      console.log("DATA: ", response.data);
      setTasks(response.data);
     // getData()
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
 };

 const deleteTodo =(id)=>{
     axios
     .delete(`http://localhost:5000/tasks/${id}`)//$ تخليهو يقراها ك قيمه متغيره  حسب المدخل للداله 
     .then((response) => {
      // console.log('RESPONSE: ', response);
      console.log("DATA: ", response.data);
     // setTasks(response.data);
      getData()
     })
     .catch((err) => {
      console.log("ERR: ", err);
     });
  }; 

 const toggleTodo  = (id,newStatus)=>{
  axios
    //.put(`http://localhost:5000/tasks/${id}/isCompleted `)//$ تخليهو يقراها ك قيمه متغيره  حسب المدخل للداله 
    .put(`http://localhost:5000/tasks/${id}/${newStatus}`) // الاستاذ
    .then((response) => {
      // console.log('RESPONSE: ', response);
      console.log("DATA: ", response.data); 
      getData()
     })
    .catch((err) => {
      console.log("ERR: ", err);
    });
  }
  
  const deleteTasks = () => {
    axios
      .delete(`http://localhost:5000/tasks`)
      //     (`http://localhost:5000/tasks/${id}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const filterData = (status) => {
    // should bring data using axios
    // from backend (GET /tasks)
    axios
      .get(`http://localhost:5000/filter?isCompleted=${status}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

 const logout =()=> {
     setLogin(false)
     setUserName(" ")
  }  
  const mapOverTasks = tasks.map((taskObj, i) => (
    <Todo
      key={taskObj._id}
      task={taskObj}
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
    />
  ));
  
  
 
  return  (
  <div className="App">
    
 <nav className="navbar navbar-expand-lg navbar-light  bg-success bg-opacity-10">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Todos
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

   <br/>
  
   <Add createFunc={postNewTitle} />
   
   <button onClick={getData}>GET TASKS</button>
   <button  onClick={() => {
                    filterData(true);
                    }}> GET DONE Tasks</button >
   <button onClick={deleteTasks}> DELETE Completed Tasks </button >



  <Routes>
   <Route path="/home" element={ <p> hi {username} </p>} />
   <Route path="/Login" element={<Login setUserName={setUserName} setLogin={setLogin} />} />
   <Route path="/Register" element={<Register />} />
  </Routes>
  
 <div class="list-group list-group-flush"> {mapOverTasks} </div>
 { mapOverTasks}

</div>
  );
}

/*
<button onClick={postNewTitle}>All TASKS</button>
        <button
          type="button"
          data-bs-toggle="popover"
          title="Todo List"
          data-bs-content="Welcome to Todo List Web Application" >
          {username ? "Welcome " + username : 
          " login "}{" "}
        </button>
  */
  