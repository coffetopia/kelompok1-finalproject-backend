const userModel = require('../models').user;
const { encryption, compare, getToken } = require('../services/security');
const response = require('../services/response');

async function register(req, res) {
  try {
    const hashedPassword = await encryption(req.body.password);

    const user = {
      ...req.body,
      password: hashedPassword,
    };

    await userModel.create(user);
    response(201, true, user, 'User created successfully', res);
  } catch (error) {
    console.log(error);
    response(400, false, error, 'Failed to register new user', res);
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

    if(user) {
      const isValid = await compare(password, user.password);
      if(isValid) {
        const token = getToken(user.username);

        res.header("authorization", token);

        const { username, email } = user;
        const data = {
          username,
          email,
          token,
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

module.exports = { register, login };