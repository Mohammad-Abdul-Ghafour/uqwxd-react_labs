import "./App.css";
import React, { useState, useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  // Add the handlesubmit code here
  const handelSubmit = (e) => {
    e.preventDefault();
    

    const newTodo = {
        id: new Date().getTime(),
        text: todo.trim(),
        completed: false,
    };
    
    if (newTodo.text.length > 0) {
        setTodos([...todos].concat(newTodo));
        setTodo("");
    }else {
        alert("Enter Valid Task");
        setTodo("");
    }
  }
  
  
  // Add the deleteToDo code here

  const handleDelete = (id) => {
    let updateTodos = [...todos].filter((todo)=>
        todo.id !== id
    );
    setTodos(updateTodos);

  }

  
  // Add the toggleComplete code here
  const handleComplete = (id) => {
    let updateTodos = [...todos].map((todo) => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    })
    setTodos(updateTodos)
  }

  
  // Add the submitEdits code here

const handleEdit = (id) => {
    const updateTodos = [...todos].map((todo) => {
        if (todo.id === id){
            todo.text = editingText
        }
        return todo
    })
    setTodos(updateTodos)
    setTodoEditing(null)
}

  
return(
<div id="todo-list">
<h1>Todo List</h1>
<form onSubmit={handelSubmit}>
<input type ="text" onChange={(e) => setTodo(e.target.value)} placeholder="Add a new task" value={todo} align ="right" />
<button type ="submit">Add Todo</button>
</form>
{todos.map((todo) => <div className="todo" key={todo.id}>
    <div className="todo-text">
            <input type='checkbox' id='completed' checked={todo.completed} onChange={()=>handleComplete(todo.id)}></input>
            {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                    placeholder = {todo.text}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
    </div>
    <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => handleEdit(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
        </div>)}
</div>
);
};
export default App;
