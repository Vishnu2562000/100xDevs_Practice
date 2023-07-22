const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.user(bodyParser);

let ADMINS = [];
let USERS = [];
let COURSES = [];

let courseCounter = 1;

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  let adminAlreadyExists = ADMINS.find(
    (admin) => admin.username === req.headers.username
  );
  if (adminAlreadyExists) {
    return res.status(401).send("Admin already exists");
  }

  let adminData = {
    username: req.headers.username,
    password: req.headers.password,
  };
  ADMINS.push(adminData);
  res.status(200).send({ message: "Logged in successfully" });
});

app.post("/admin/login", (req, res) => {
  // logic to log in admin
  let adminIndex = ADMINS.findIndex(
    (admin) =>
      admin.username === req.headers.username &&
      admin.password === req.headers.password
  );
  if (adminIndex === -1) {
    return res.status(401).send("Unauthorized");
  }

  res.status(200).send({ message: "Logged in successfully" });
});

app.post("/admin/courses", (req, res) => {
  // logic to create a course
  /*
  Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }
   Output: { message: 'Course created successfully', courseId: 1 }
  */
  let newCouse = req.body;
  let courseAlreadyExists = COURSES.find(
    (course) => course.name === newCourse.name
  );
  if (courseAlreadyExists) {
    return res.status(401).send("Course with this name already exists");
  }
  COURSES.push(newCourse);
  res.status(201).send({
    message: "Course created successfully",
    courseId: courseCounter++,
  });
});

app.put("/admin/courses/:courseId", (req, res) => {
  // logic to edit a course
  let newCouse = req.body;
  let courseIndex = COURSES.findIndex(
    (course) => course.courseId === newCourse.courseId
  );
  if (courseIndex === -1) {
    return res.status(404).send("Course not found");
  }
  COURSES.splice(courseIndex, 1, req.body);
  res.status(200).send({ message: "Course updated successfully" });
});

app.get("/admin/courses", (req, res) => {
  // logic to get all courses
  return res.status(200).send(COURSES);
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
});

app.post("/users/login", (req, res) => {
  // logic to log in user
  let userAlreadyExists = USERS.find(
    (user) => user.username === req.headers.username
  );
  if (userAlreadyExists) {
    return res.status(401).send("User already exists");
  }
  userData;
  let userData = {
    username: req.headers.username,
    password: req.headers.password,
  };
  USERS.push(userData);
  res.status(200).send({ message: "Logged in successfully" });
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
