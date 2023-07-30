import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  // fetch all todos from server
  useEffect(() => {
    fetch("http://localhost:3000/todos", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setTodos(data));

    // constantly fetching updated data every second
    const IntervalId = setInterval(() => {
      fetch("http://localhost:3000/todos", { method: "GET" })
        .then((response) => response.json())
        .then((data) => setTodos(data));
    }, 100);
    //clearing the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(IntervalId);
  }, []);

  const handleDeleteToDo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" });
  };

  return (
    <>
      <h1 style={{ alignItems: "center" }}>TODO LIST</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <span>{todo.title}</span>
          <span>{todo.description}</span>
          <span>
            <button onClick={() => handleDeleteToDo(todo.id)}>Delete</button>
          </span>
        </div>
      ))}
    </>
  );
}

export default App;
