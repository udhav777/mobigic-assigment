import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    axios
      .post("http://localhost:4000/user/register", {
        name,
        username,
        password,
      })
      .then((res) => {
        if (res.data === "user registerd") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="main">
        <h1>Register User</h1>
        <input
          placeholder="Enter you name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" onClick={handleRegister}>
          Register User
        </button>
      </div>

      <div className="Link">
        <button>
          <Link to="/login">If Already user</Link>
        </button>
      </div>
    </>
  );
};

export default Register;
