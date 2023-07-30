import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div style={{ paddingTop: 300 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" style={{ paddingBottom: 20 }}>
          Add the Course Info...
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 600, padding: 20 }}>
          <TextField
            fullWidth
            id="title"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="description"
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/courses", {
                method: "POST",
                body: JSON.stringify({
                  title,
                  description,
                  imageLink: "",
                  published: true,
                }),
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
                .then((res) => res.json())
                .then((data) => console.log(data));
            }}
          >
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AddCourse;
