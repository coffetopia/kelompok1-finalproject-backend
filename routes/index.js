const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const userModel = require('../models').user;

router.get('/', (req, res) => {
  res.send('Home');
});

router.post('/register', (req, res) => {
  userModel.create(req.body).then((success) => {
    res.json({
      status: true,
      message: "User created successfully",
    });
  }).catch((error) => {
    res.json({
      status: false,
      message: "Failed to register new user",
    });
  });
});

router.get('/register', (req, res) => {
  userModel.findOne({
    where: {
      id: 1,
    },
  }).then((success) => {
    console.log(success);
    res.send(success);
  }).catch((error) => {
    console.log(error);
    res.send(500);
  });
})

module.exports = router;