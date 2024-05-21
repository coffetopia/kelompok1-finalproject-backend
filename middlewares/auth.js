const jwt = require("jsonwebtoken");
const response = require('../services/response');

function auth(req, res, next) {
  const authorization = req.header('authorization')
  if(!authorization) return response(403, false, '', 'No token provided!', res);
  const token = req.header('authorization').split(' ')[1];

  if(!token) return response(403, false, '', 'No token provided!', res);

  jwt.verify(token, process.env.JWT_SCREET, (err, decoded) => {
    if(err) return response(403, false, err, 'Unauthorized!', res);
    req.username = decoded;
    next();
  });
}

module.exports = auth;