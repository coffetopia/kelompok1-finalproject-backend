const { User } = require('../models');
const { encryption, compare, getToken } = require('../services/security');
const response = require('../services/response');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const hashedPassword = await encryption(req.body.password);
    const user = {
      ...req.body,
      password: hashedPassword,
    };
    await User.create(user);
    response(201, true, user, 'User created successfully', res);
  } catch (error) {
    console.log(error);
    response(400, false, error, 'Failed to register new user', res);
  }
};

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if(user) {
      const isValid = await compare(password, user.password);
      if(isValid) {
        const accessToken = getToken(user.username, 'access');
        const refreshToken = getToken(user.username, 'refresh');

        const update = await user.update({ refresh_token: refreshToken });
        
        console.log(update);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        const { username, email } = user;
        const data = {
          username,
          email,
          accessToken,
        } 
        response(201, true, data, 'Authentication success', res);
      } else {
        response(401, false, '', 'Authentication failed', res);
      }} else {
        response(401, false, '', 'Authentication failed', res);
      }
    } catch (error) {
      response(401, false, error, 'Authentication failed', res);
  }
}

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return response(401, false, '', 'Authentication failed', res);
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    console.log(user);
    if(!user) response(403, false, '', 'Authentication failed', res);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SCREET, (err, decode) => {
      if(err) return response(403, false, err, 'Authentication failed', res);
      const username = 
    });
  } catch (error) {
    response(401, false, error, 'Authentication failed', res);
  }
}

const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if(!token) return response(204, false, '', 'Logout failed, token not found', res);
    res.header('authorization', '');
    res.send(200);
  } catch (error) {
    response(500, false, error, 'Logout failed, something wrong with server', res);
  }
}

module.exports = { register, login, logout };