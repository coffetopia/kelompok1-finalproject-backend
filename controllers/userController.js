const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const userModel = require('../models').user;

async function registerUser(req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      ...req.body,
      password: hashedPassword,
    };

    const success = await userModel.create(user);
    res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Failed to register new user",
    });
  }
};

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({
      where: {
        username,
      },
    });

    console.log(user);

    if(user) {
      const isPassword = await bcrypt.compare(password, user.password);
      if(isPassword) {
        const token = jwt.sign({ username: user.username }, process.env.JWT_SCREET, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.header("authorization", 'Bearer ' + token);
        
        res.status(201).json({
          status: true,
          username: user.username,
          email: user.email,
          token,
        });
      } else {
        res.status(401).json({
          status: false,
          message: "Authentication failed",
        });
      }} else {
        res.status(401).json({
          status: false,
          message: "Authentication failed",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: false,
      message: "Authentication failed",
    });
  }
}

module.exports = { registerUser, login };