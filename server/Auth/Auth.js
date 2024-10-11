const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "7cda23066042e310677d3d0d2c846eba5ba1c9dea4a5584356247fef14d2e9e199e5cb711ce557d4e2d29cd1221aec48571ddd997c11b7dcc45d82b2a8bf5729";

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
      })
        .then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            { expiresIn: maxAge * 1000 }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });
          res.status(201).json({
            message: "User registered successfully",
            user: user._id,
            role: user.role,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "Failed to register user",
            error: error.message,
          });
        });
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to hash password",
      error: error.message,
    });
  }
};
