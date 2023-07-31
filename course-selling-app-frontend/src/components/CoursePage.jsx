import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import CourseCard from "./CourseCard";
import UpdateCourse from "./UpdateCourse";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  courseCardContainer: {
    marginTop: theme.spacing(10), // Default value for all screen sizes
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(6), // Adjust for small and extra-small screens
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(15), // Adjust for medium screens and above
    },
  },
  outerGridContainer: {
    marginTop: theme.spacing(10), // Default value for all screen sizes
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0), // Adjust for small and extra-small screens
    },
  },
  mainDiv: {
    marginTop: theme.spacing(10), // Default value for all screen sizes
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0), // Adjust for small and extra-small screens
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(12), // Adjust for medium screens and above
    },
  },
}));

const CoursePage = () => {
  const [course, setCourse] = useState([]);
  const { courseId } = useParams();
  const theme = useTheme();
  const classes = useStyles();

  console.log("Hello from Course Page!");

  useEffect(() => {
    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCourse(data.course));
  }, [courseId]);

  const handleUpdateCourse = (updatedCourse) => {
    // Update the course state with the updatedCourse data
    setCourse(updatedCourse);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
      className={classes.mainDiv}
    >
      {course ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          className={classes.outerGridContainer}
        >
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <div className={classes.courseCardContainer}>
              <CourseCard course={course} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={6}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Update Course Info
              </Typography>
            </div>
            <UpdateCourse
              updatedCourse={course}
              onUpdate={handleUpdateCourse}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </div>
  );
};

export default CoursePage;
