const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function encryption(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function compare(inputPassword, password) {
  return bcrypt.compare(inputPassword, password);
}

function getToken(username, type) {
  if(type == 'access') {
    return jwt.sign({ username: username }, process.env.JWT_SCREET, {
      expiresIn: '20s',
    });
  }
  return jwt.sign({ username: username }, process.env.JWT_REFRESH_SCREET, {
    expiresIn: '1d',
  });
}

// secure: true

module.exports = { encryption, compare, getToken };