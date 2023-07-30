import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(undefined);
  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      headers: {
        // "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUserEmail(data.username))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography variant="h6">Coursera</Typography>
      </div>
      <div style={{ marginRight: 10 }}>
        {userEmail ? (
          userEmail
        ) : (
          <Button
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => {
              // window.location = "/signup";
              navigate("/signup");
            }}
          >
            Sign up
          </Button>
        )}
        <Button
          variant="contained"
          onClick={() => {
            if (userEmail) {
              localStorage.setItem("token", undefined);
              window.location = "/";
            } else {
              navigate("/login");
            }
            // window.location = "/login";
          }}
        >
          {userEmail ? "Log Out" : "Log in"}
        </Button>
      </div>
    </div>
  );
};

export default Appbar;
