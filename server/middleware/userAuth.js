const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const AutheticatUser = async (req, res, next) => {
  const { token } = req.body.token;
  if (!token) {
    res.status(400).json({ message: "Please login first " });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findOne(decode._id);

  next();
};

module.exports = AutheticatUser;
