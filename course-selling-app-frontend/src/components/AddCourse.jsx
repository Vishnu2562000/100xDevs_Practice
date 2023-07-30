import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid, FormControl, InputLabel, useTheme } from "@mui/material";

const AddCourse = () => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState("");

  const handleAddCourse = () => {
    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
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
      .then((data) => console.log(data));
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image Link:", imageLink);
    console.log("Price:", price);
  };

  return (
    <div style={{ paddingTop: theme.spacing(4) }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: theme.spacing(2),
        }}
      >
        <Typography variant="h6">Add Course Info</Typography>
      </div>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
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
              onClick={handleAddCourse}
              style={{
                marginTop: theme.spacing(2),
                backgroundColor: "#4caf50",
                color: "#fff",
              }}
            >
              Add Course
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddCourse;
