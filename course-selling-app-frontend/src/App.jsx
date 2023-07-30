import { useState } from "react";
import "./App.css";
import { SignUp, Signin, Appbar, AddCourse } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >
      <Router>
        <Appbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/addCourse" element={<AddCourse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
