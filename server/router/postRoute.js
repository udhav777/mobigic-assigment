const express = require("express");
const {
  getAllFiles,
  uploadFile,
  deleteFile,
  downloadFile,
} = require("../controller/postController");
const AutheticatUser = require("../middleware/userAuth");
const upload = require("../middleware/fileUpload");

const routes = express.Router();

routes.post("/getAllFiles", getAllFiles);

routes.post("/uploadFile", upload.single("file"), uploadFile);

routes.delete("/deleteFile/:id", deleteFile);

routes.get("/downloadFile/:id", downloadFile);

module.exports = routes;
