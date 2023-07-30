import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div style={{ paddingTop: 300 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" style={{ paddingBottom: 20 }}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            fullWidth
            id="username"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="password"
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
              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => localStorage.setItem("token", data.token));
              window.location = "/";
            }}
          >
            Sign Up
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
