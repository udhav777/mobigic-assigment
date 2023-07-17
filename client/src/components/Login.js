import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    axios
      .post("http://localhost:4000/user/login", { username, password })
      .then((res) => {
        if (res.data.message === "login success") {
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        }
      })
      .catch((err) => {
        if (err.response.data.message === "userName not exites") {
          alert("Username not exits ");
        }
        if (err.response.data.message === "invalid credentials") {
          alert("please provide valide credetioal");
        }
        console.log(err);
      });
  };
  return (
    <>
      <div className="main">
        <h1>Login User</h1>
        <input
          placeholder="Enter Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" onClick={handleLogin}>
          Login User
        </button>
      </div>
      <div className="Link">
        <button>
          <Link to="/">If not user</Link>
        </button>
      </div>
    </>
  );
};

export default Login;
