const jwt = require("jsonwebtoken");
const response = require('../services/response');

function auth(req, res, next) {
  const token = req.header('authorization').split(' ');

  if(!token) {
    response(403, false, '', 'No token provided!', res);
  }

  jwt.verify(token[1], process.env.JWT_SCREET, (err, decoded) => {
    if(err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    next();
  });
}

module.exports = auth;