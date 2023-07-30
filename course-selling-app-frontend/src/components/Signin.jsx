import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
const Signin = () => {
  return (
    <div style={{ paddingTop: 300 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" style={{ paddingBottom: 20 }}>
          Welcome to Coursera. Sign in below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button size="large" variant="contained">
            Sign in
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
