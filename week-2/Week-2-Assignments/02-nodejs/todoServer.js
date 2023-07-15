const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

const todosFilePath = "todos.json";

// Helper function to read todos from file
const readTodosFromFile = () => {
  try {
    const todosData = fs.readFileSync(todosFilePath, "utf-8");
    return JSON.parse(todosData);
  } catch (err) {
    // If the file doesn't exist or there's an error reading it, return an empty array
    return [];
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

// For all remaining routes, send 404
app.use((req, res) => {
  res.status(404).send();
});

module.exports = app;
