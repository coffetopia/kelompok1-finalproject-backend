const userModel = require('../models').user;
const response = require('../services/response');
const jwt = require('jsonwebtoken');

async function showProfile(req, res) {
  try {
    const token = req.header('authorization').split(' ');
    const { username } = jwt.verify(token[1], process.env.JWT_SCREET);

    const user = await userModel.findOne({
      where: {
        username,
      },
    });

    const role = user.isAdmin ? 'Admin' : 'Member';

    const data = {
      username: user.username,
      email: user.email,
      role,
    }

    response(200, true, data, 'User profile', res);
  } catch (error) {
    response(500, false, error, 'Server Error', res);
  }
}

module.exports = { showProfile };