const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  res.json({
    token: generateToken(user),
    user: { id: user._id, username: user.username, role: user.role },
  });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ msg: "User already exists" });

  const user = new User({ username, password, role });
  await user.save();

  res.status(201).json({
    token: generateToken(user),
    user: { id: user._id, username: user.username, role: user.role },
  });
};
