
import React ,{useState } from 'react'; 

export default function Add (props){
 const [ newTitle ,setNewTitle] =useState(" ");
 const createNewTodo = () => {
  // {"title":"task 5","isCompleted": false}
  props.createFunc({title: newTitle, isCompleted:false});
};
    return(
        <div className="ms-3" >
        <label className="list-group list-group-flush"></label>
        <input className="list-group-item" type='text'  placeholder="write new ..."
         onChange={(e)=> //حدث يحفط التقيير 
         setNewTitle(e.target.value) // ياخذ القيمه الجديده و يخزنها 
         }/> 
         <button onClick={createNewTodo}> + </button>
        </div>
    );
};
