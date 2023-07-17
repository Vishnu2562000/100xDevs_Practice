const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

//for avoiding cors error, we use cors library. Should not be used in production
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const todosFilePath = path.join(__dirname, "todos.json");

// Helper function to read todos from file
const readTodosFromFile = () => {
  try {
    const todosData = fs.readFileSync(todosFilePath, "utf-8");
    console.log(todosData);
    return JSON.parse(todosData);
  } catch (err) {
    // If the file doesn't exist or there's an error reading it, return an empty array
    throw err;
  }
};

// Helper function to write todos to file
const writeTodosToFile = (todos) => {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), "utf-8");
};

app.get("/todos", (req, res) => {
  const todos = readTodosFromFile();
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todos = readTodosFromFile();
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send();
  }
});

app.post("/todos", (req, res) => {
  const todos = readTodosFromFile();

  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description,
  };

  todos.push(newTodo);
  writeTodosToFile(todos);

  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todos = readTodosFromFile();

  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );

  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;

    writeTodosToFile(todos);

    res.json(todos[todoIndex]);
  }
});

app.delete("/todos/:id", (req, res) => {
  const todos = readTodosFromFile();

  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );

  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);

    writeTodosToFile(todos);

    res.status(200).send();
  }
});

//Sending our frontend to localhost which is acting as backend.
//If frontend and backend are from same url(here it is localhost), then cors error will be gone

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// For all remaining routes, send 404
app.use((req, res) => {
  res.status(404).send();
});

// module.exports = app;
app.listen(3000);
