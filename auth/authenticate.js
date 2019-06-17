require("dotenv").config();
const jwt = require("jsonwebtoken");

// quickly see what this file exports
module.exports = {
  authenticate,
  generateToken
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, process.env.PRIVATE, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}

const i = "Seun-O @ LambdaSchool"; //Issuer
const a = "http://localhost:3300/api"; // Audience

function generateToken(user) {
  const payload = {
    subject: user.id
  };
  const options = {
    issuer: i,
    audience: a,
    expiresIn: "12h"
  };

  return jwt.sign(payload, process.env.PRIVATE, options);
}
