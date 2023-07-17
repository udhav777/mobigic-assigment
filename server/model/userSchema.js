const moongose = require("mongoose");

const userSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is require"],
    },
    username: {
      type: String,
      required: [true, "Username is require"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is require"],
      min: [6, " password should at least 6 charater"],
      max: [25, "maximum length of password is 25 charater"],
    },
  },
  {
    timestamps: true,
  }
);

const User = moongose.model("User", userSchema);
module.exports = User;
