const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const adminExists = ADMINS.find(
    (admin) => admin.username === username && admin.password === password
  );
  if (adminExists) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const userExists = USERS.find(
    (user) => user.username === username && user.password === password
  );
  if (userExists) {
    req.user = userExists; //add user object to req
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const adminAlreadyExists = ADMINS.find(
    (admin) => admin.username === username && admin.password === password
  );
  if (adminAlreadyExists) {
    return res.status(403).send("Admin already exists");
  }

  ADMINS.push(req.body);
  res.status(200).json({ message: "Admin created successfully" });
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  // logic to log in admin
  res.json({ message: "Logged in successfully" });
});

app.post("/admin/courses", adminAuthentication, (req, res) => {
  // logic to create a course

  const newCourse = { ...req.body, id: Date.now() };
  COURSES.push(newCourse);
  res.json({
    message: "Course created successfully",
    courseId: newCourse.id,
  });
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((course) => course.id === courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  Object.assign(course, req.body);
  res.json({ message: "Course updated successfully" });
});

app.get("/admin/courses", adminAuthentication, (req, res) => {
  // logic to get all courses
  res.json({ courses: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const user = { ...req.body, purchasedCourses: [] };
  USERS.push(user);
  res.json({ message: "User created successfully" });
});

app.post("/users/login", userAuthentication, (req, res) => {
  // logic to log in user
  res.json({ message: "Logged in successfully" });
});

app.get("/users/courses", userAuthentication, (req, res) => {
  // logic to list all courses
  const publishedCourses = COURSES.filter(
    (course) => course.published === true
  );
  res.json({ courses: publishedCourses });
});

app.post("/users/courses/:courseId", userAuthentication, (req, res) => {
  // logic to purchase a course
  const courseId = Number(req.params.courseId);
  const course = COURSES.find(
    (course) => course.id === courseId && course.published
  );
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: "Course purchased successfully" });
  } else {
    res.status(404).json({ message: "Course not found or not available" });
  }
});

app.get("/users/purchasedCourses", userAuthentication, (req, res) => {
  // logic to view purchased courses
  const purchasedCourseIds = req.user.purchasedCourses;
  const purchasedCourses = COURSES.filter((course) =>
    purchasedCourseIds.includes(course.id)
  );
  res.json({ purchasedCourses });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
