const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const mongoose = require("mongoose");
app.use(express.json());

//define mongoose schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

//define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

//secret keys for users and admins
const userRoutesSecretKey = "user_routes_secret_key";
const adminRoutesSecretKey = "admin_routes_secret_key";

//generating jwt tokens for users and admins
const generateJwtForAdmin = (admin) => {
  const payload = { username: admin.username };
  return jwt.sign(payload, adminRoutesSecretKey, { expiresIn: "1h" });
};

const generateJwtForUser = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, userRoutesSecretKey, { expiresIn: "1h" });
};

//authenticating jwt tokens
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

//connecting to mongoose
mongoose.connect(
  "mongodb+srv://vishnu2562:vishnu2562@cluster0.lpbnxqo.mongodb.net/courses",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Admin routes
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    return res.status(403).json("Admin already exists");
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = generateJwtForAdmin({ username, role: "admin" });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = generateJwtForAdmin({ username, role: "admin" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

app.post("/admin/courses", authenticateJwtForAdmin, async (req, res) => {
  // logic to create a course
  const courseAlreadyExists = await Course.findOne({ title: req.body.title });
  if (courseAlreadyExists) {
    return res.status(403).send("Course with this name already exists");
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json({
    message: "Course created successfully",
    courseId: newCourse.id,
  });
});

app.put(
  "/admin/courses/:courseId",
  authenticateJwtForAdmin,
  async (req, res) => {
    // logic to edit a course
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.json({ message: "Course updated successfully" });
  }
);

app.get("/admin/courses", authenticateJwtForAdmin, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({}); //get all courses
  res.json({ courses });
});

// User routes
app.post("/users/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = generateJwtForUser({ username, role: "user" });
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = generateJwtForUser({ username, role: "user" });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
});

app.get("/users/courses", authenticateJwtForUser, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

app.post(
  "/users/courses/:courseId",
  authenticateJwtForUser,
  async (req, res) => {
    // logic to purchase a course

    const course = await Course.findById(req.params.courseId);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully" });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  }
);

app.get("/users/purchasedCourses", authenticateJwtForUser, async (req, res) => {
  // logic to view purchased courses

  //we only stored id's of courses in purchasedCourses. If we want to get full courses data,
  //we need to populate the purchasedCourses array with courses corresponding to respective course id's
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    //if user did not purchase any courses, return an empty array
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
