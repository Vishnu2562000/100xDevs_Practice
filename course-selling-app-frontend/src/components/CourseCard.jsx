import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  media: {
    height: 220,
    [theme.breakpoints.down("sm")]: {
      height: 180,
    },
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  price: {
    fontSize: 18,
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  noImage: {
    backgroundColor: "#f0f0f0", // Set the background color for no image
  },
}));

const CourseCard = ({ course }) => {
  const classes = useStyles();
  const { imageLink, title, description, price } = course;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  console.log("Hello from Course Card!");

  return (
    <Card className={classes.card}>
      <CardMedia
        className={`${classes.media} ${!imageLink && classes.noImage}`}
        image={imageLink}
        title={title}
        component="img"
        onLoad={handleImageLoaded}
        style={{ display: imageLoaded ? "inherit" : "none" }}
      />
      {!imageLoaded && <div style={{ height: 220 }} />}{" "}
      {/* Blank placeholder */}
      <CardContent style={{ visibility: imageLoaded ? "visible" : "hidden" }}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.description}
        >
          {description}
        </Typography>
        <Typography variant="body1" className={classes.price}>
          Price: {price}
        </Typography>
        <Button variant="contained" className={classes.button}>
          Enroll Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
