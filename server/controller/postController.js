const Post = require("../model/postSchema");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const getAllFiles = async (req, res) => {
  const token = req.body.token;
  const userID = await jwt.verify(token, process.env.JWT_SECRET);
  const files = await Post.find({ owner: userID.id });
  if (!files) {
    res.status(404).json({ message: "data not found" });
  }
  res.status(200).json({ success: true, files });
};

const uploadFile = async (req, res) => {
  const files = req.file;
  if (!files) {
    res.status(400).json({ message: "Please upload file" });
  }
  const token = req.body.token;
  const userID = await jwt.verify(token, process.env.JWT_SECRET);
  const accesscode = await Math.floor(100000 + Math.random() * 900000);
  try {
    const post = await Post({
      owner: userID.id,
      accesscode,
      fileName: req.file.originalname,
    });
    if (!post) {
      res.status(400).json({ message: "file upload field" });
    }
    post.save();
    res.status(201).json({
      message: "file uploaded",
      accesscode,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delet file

const deleteFile = async (req, res) => {
  const accesscode = req.params.id;

  try {
    const recordDeleted = await Post.deleteOne({ _id: accesscode });
    if (!recordDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "file not deleted" });
    }

    res.status(200).json({ success: true, message: "file deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// download File

const downloadFile = async (req, res) => {
  const _id = req.params.id;

  const post = await Post.findOne({ _id });
  console.log(post);
  if (!post) {
    res.status(404).json({ message: "File not found" });
  }
};

module.exports = {
  getAllFiles,
  uploadFile,
  deleteFile,
  downloadFile,
};
