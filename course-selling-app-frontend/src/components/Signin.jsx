import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/login", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  username: email,
                  password: password,
                },
              })
                .then((res) => res.json())
                .then((data) => localStorage.setItem("token", data.token));
              window.location = "/courses";
            }}
          >
            Sign In
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
