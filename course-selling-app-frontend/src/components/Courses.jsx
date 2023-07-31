import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CourseCard from "./CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Debugging: Check the data structure here
        // Make sure the data is an array or adjust the line below accordingly
        setCourses(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 4 }}>
        {courses.map((course) => (
          <Grid key={course.id} item xs={12} sm={6} md={4} lg={3}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Courses;
