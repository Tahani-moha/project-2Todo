
import React from "react";
export default function Todo(props)  {
  const{_id, title, isCompleted}=props.task;
  
    return (
      <div className="Todo">

        <input type="checkbox" defaultChecked ={isCompleted}
        onClick={()=>{
          props.upTodo(_id,!isCompleted)
        }} />
          <span> {title} </span> 
          
        <button onClick={()=>{
          props.deleteTodo(_id)
        }}> x </button>

      </div>
    );
  }

   