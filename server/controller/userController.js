const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      res.status(404).json("all field require");
    }

    // has password
    const salt = await bcrypt.genSalt(10);
    const haspassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, username, password: haspassword });
    if (!user) {
      res.status(400).json("invalide data ");
    }

    user.save();
    res.status(201).json("user registerd");
  } catch (error) {
    res.status(400).json(error);
  }
};

//  login User
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "all field required" });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "userName not exites" });
    }

    // compare password

    const data = await bcrypt.compare(password, user.password);
    if (!data) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .status(201)
      .cookie("token", token)
      .json({ message: "login success", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// logout User

const logoutUser = async (req, res) => {};
module.exports = {
  registerUser,
  loginUser,
};
