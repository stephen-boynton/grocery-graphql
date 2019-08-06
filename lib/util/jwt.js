const jwt = require('jsonwebtoken');

exports.sign = function jwtSign(payload) {
  return jwt.sign(payload, process.env.AUTH_STRING, { algorithm: 'HS384' });
};

exports.verify = function verify(token) {
  try {
    return jwt.verify(token, process.env.AUTH_STRING, { algorithm: 'HS384' });
  } catch (e) {
    return false;
  }
};
