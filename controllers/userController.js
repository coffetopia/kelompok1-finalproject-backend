const userModel = require('../models').user;
const response = require('../services/response');
const getUsername = require('../services/getUsername');
const { encryption } = require('../services/security');

async function showProfile(req, res) {
  try {
    const username = getUsername(req);

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

async function editUser(req, res) {
  try {
    const usernameLogged = getUsername(req);
    const { username, email, password } = req.body;
    
    const usernameRegistered = await userModel.findOne({
      where: {
        username,
      },
    });

    const emailRegistered = await userModel.findOne({
      where: {
        email,
      },
    });

    if (usernameRegistered !== null) {
      return response(403, false, '', 'This username was registered', res);
    }
    
    if (emailRegistered !== null) {
      return response(403, false, '', 'This email was registered', res);
    }

    const hashedPassword = await encryption(password);

    const update = await userModel.update(
      {
        username,
        password: hashedPassword,
        email,
      },
      {
        where: {
          username: usernameLogged,
        },
      },
    );

    response(201, true, update, 'User was edited successfully');
  } catch (error) {
    response(500, false, error, 'Server Error', res);
  }
}

module.exports = { showProfile, editUser };