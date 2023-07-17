const express = require("express");
require("dotenv").config();
const cors = require("cors");
const moongose = require("mongoose");
const app = express();
const route = require("./router/userRouter");
const routes = require("./router/postRoute");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const path = require("path");

// midlleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/user", route);
app.use("/post", routes);

// data connection

moongose
  .connect(process.env.DBURL)
  .then(() => console.log("database is connected"))
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
