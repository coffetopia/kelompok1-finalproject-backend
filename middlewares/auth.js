const jwt = require("jsonwebtoken");
const response = require('../services/response');

function auth(req, res, next) {
  const authorization = req.header('authorization')

  if(!authorization) {
    response(403, false, '', 'No token provided!', res);
  }
  
  const token = req.header('authorization').split(' ');

  if(!token) {
    response(403, false, '', 'No token provided!', res);
  }

  jwt.verify(token[1], process.env.JWT_SCREET, (err, decoded) => {
    if(err) {
      response(403, false, err, 'Unauthorized!', res);
    }
    next();
  });
}

module.exports = auth;