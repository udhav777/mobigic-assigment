import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:4000/post/getAllFiles/", {
        token: localStorage.getItem("token"),
      })
      .then((res) => setData(res.data.files))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/post/getAllFiles/", {
        token: localStorage.getItem("token"),
      })
      .then((res) => setData(res.data.files))
      .catch((err) => console.log(err));
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const config = {
      Headers: {
        "content-type": "multipart/from-data",
      },
    };
    const fromData = new FormData();
    fromData.append("file", file);
    fromData.append("token", token);

    axios
      .post("http://localhost:4000/post/uploadFile", fromData, config)
      .then((res) => console.log("file Upload"))
      .catch((err) => console.log(err));
  };

  const handleDelete = (item) => {
    let enteredName = prompt("Please enter 6 digit  access code");
    enteredName = parseInt(enteredName);

    if (item.accesscode === enteredName) {
      axios
        .delete(`http://localhost:4000/post/deleteFile/${item._id}`)
        .then((res) => console.log("file deleted"))
        .catch((err) => console.log(err));
    } else {
      alert("please enter valide access code");
    }
  };

  const handleDownload = (item) => {
    let enteredName = prompt("Please enter 6 digit  access code");
    enteredName = parseInt(enteredName);

    if (item.accesscode === enteredName) {
      axios
        .get(`http://localhost:4000/post/downloadFile/${item._id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      alert("please enter valide access code");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Home Page</h1>

      <form onSubmit={handleSubmit}>
        <h3> File Upload</h3>
        <div className="input_Form">
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Upload</button>
        </div>
      </form>

      <table>
        <tr>
          <th>Sr.NO</th>
          <th>fileName</th>

          <th>access code</th>
          <th>Action</th>
        </tr>

        {data.length > 0 &&
          data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.fileName}</td>

              <td>{item.accesscode}</td>
              <td>
                <button className="btn1" onClick={() => handleDelete(item)}>
                  delete
                </button>
                <button className="btn2" onClick={() => handleDownload(item)}>
                  Download
                </button>
              </td>
            </tr>
          ))}
      </table>

      <button className="logout_btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
