const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
app.use(express.json());
app.use(cors());

let ADMINS = [];
let USERS = [];
let COURSES = [];

try {
  ADMINS = JSON.parse(fs.readFileSync("admins.json", "utf-8"));
  USERS = JSON.parse(fs.readFileSync("users.json", "utf-8"));
  COURSES = JSON.parse(fs.readFileSync("courses.json", "utf-8"));
} catch {
  ADMINS = [];
  USERS = [];
  COURSES = [];
}

const userRoutesSecretKey = "user_routes_secret_key";
const adminRoutesSecretKey = "admin_routes_secret_key";

const generateJwtForAdmin = (admin) => {
  const payload = { username: admin.username };
  return jwt.sign(payload, adminRoutesSecretKey, { expiresIn: "1h" });
};

const generateJwtForUser = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, userRoutesSecretKey, { expiresIn: "1h" });
};

const authenticateJwtForAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, adminRoutesSecretKey, (err, admin) => {
      if (err) {
        return res.sendStatus(403);
      }
      // req.admin = admin;//not used anywhere
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authenticateJwtForUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, userRoutesSecretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const newAdmin = req.body;
  let adminAlreadyExists = ADMINS.find(
    (admin) => admin.username === newAdmin.username
  );
  if (adminAlreadyExists) {
    return res.status(403).json("Admin already exists");
  } else {
    ADMINS.push(newAdmin);
    fs.writeFileSync("admins.json", JSON.stringify(ADMINS));
    const token = generateJwtForAdmin(newAdmin);
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );

  if (admin) {
    const token = generateJwtForAdmin(admin);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

app.post("/admin/courses", authenticateJwtForAdmin, (req, res) => {
  // logic to create a course
  /*
  Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }
   Output: { message: 'Course created successfully', courseId: 1 }
  */
  const newCourse = req.body;
  const courseAlreadyExists = COURSES.find(
    (course) => course.name === newCourse.name
  );
  if (courseAlreadyExists) {
    return res.status(403).send("Course with this name already exists");
  }
  newCourse.id = COURSES.length + 1;
  COURSES.push(newCourse);
  fs.writeFileSync("courses.json", JSON.stringify(COURSES));
  res.json({
    message: "Course created successfully",
    courseId: newCourse.id,
  });
});

app.put("/admin/courses/:courseId", authenticateJwtForAdmin, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) {
    return res.status(404).send("Course not found");
  }
  Object.assign(course, req.body);
  fs.writeFileSync("courses.json", JSON.stringify(COURSES));
  res.json({ message: "Course updated successfully" });
});

app.get("/admin/courses", authenticateJwtForAdmin, (req, res) => {
  // logic to get all courses
  res.json({ courses: COURSES });
});

app.get("/admin/me", authenticateJwtForAdmin, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const user = req.body;
  const existingUser = USERS.find((u) => u.username === user.username);
  if (existingUser) {
    res.status(403).json({ message: "User already exists" });
  } else {
    USERS.push(user);
    fs.writeFileSync("users.json", JSON.stringify(USERS));
    const token = generateJwtForUser(user);
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = generateJwtForUser(user);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
});

app.get("/users/courses", authenticateJwtForUser, (req, res) => {
  // logic to list all courses
  res.json({ courses: COURSES.filter((course) => course.published) });
});

app.post("/users/courses/:courseId", authenticateJwtForUser, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId);
  if (course) {
    const user = USERS.find((u) => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFileSync("users.json", JSON.stringify(USERS));
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/users/purchasedCourses", authenticateJwtForUser, (req, res) => {
  // logic to view purchased courses
  const user = USERS.find((u) => u.username === req.user.username);
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: "No courses purchased" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
