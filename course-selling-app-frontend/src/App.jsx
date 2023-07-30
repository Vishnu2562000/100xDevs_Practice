import { useState } from "react";
import "./App.css";
import { SignUp, Signin, Appbar, AddCourse, Courses } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Your custom theme configuration here (if any)
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Appbar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
