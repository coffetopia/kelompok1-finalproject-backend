const jwt = require("jsonwebtoken");

function verifyToken (req, res, next) {
  const token = req.header('authorization').split(' ');
  console.log(token);

  if(!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token[1], process.env.JWT_SCREET, (err, decoded) => {
    if(err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    console.log(decoded);
    next();
  });
}

module.exports = verifyToken;