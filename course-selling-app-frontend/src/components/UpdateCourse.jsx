import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid, FormControl, useTheme } from "@mui/material";

const UpdateCourse = ({ updatedCourse, onUpdate }) => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState("");

  console.log("Hello from update course!");

  // Populate the form fields with the existing course data when provided
  useEffect(() => {
    if (updatedCourse) {
      setTitle(updatedCourse.title || "");
      setDescription(updatedCourse.description || "");
      setImageLink(updatedCourse.imageLink || "");
      setPrice(updatedCourse.price || "");
    }
  }, [updatedCourse]);

  const handleUpdateCourse = () => {
    fetch(`http://localhost:3000/admin/courses/${updatedCourse.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
        imageLink,
        price,
        published: true,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        onUpdate(data.course);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div style={{ paddingTop: theme.spacing(4) }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          <Card variant="outlined" style={{ padding: theme.spacing(2) }}>
            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{
                  style: {
                    fontSize: theme.breakpoints.down("sm") ? "1rem" : "1.2rem",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                variant="outlined"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{
                  style: {
                    fontSize: theme.breakpoints.down("sm") ? "0.9rem" : "1rem",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                label="Image Link"
                variant="outlined"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleUpdateCourse}
              style={{
                marginTop: theme.spacing(2),
                backgroundColor: "#4caf50",
                color: "#fff",
              }}
            >
              Update Course
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateCourse;
