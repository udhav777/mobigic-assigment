const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  accesscode: {
    type: Number,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
