const express = require('express');
const bcrypt = require('bcrypt');
// const { where } = require('sequelize');
const router = express.Router();
const userModel = require('../models').user;
const verifyToken = require('../middlewares/auth');
const { registerUser, login } = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('Home');
});

router.post('/register', registerUser);
router.post('/login', login);

router.get('/dashboard', verifyToken, (req, res) => {
  res.sendStatus(200);
});

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   userModel.findOne({
//     where: {
//       username,
//     },
//   }).then((success) => {
//     console.log(success);
//     res.send(200);
//   }).catch((error) => {
//     console.log(error);
//     res.send(500);
//   });
// });

module.exports = router;