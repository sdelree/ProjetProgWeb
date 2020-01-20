/**
 * This middleware tests whether the client sent an authentication along with its request
 * and sets the property "user" on the request if this is the case.
 */

const userService = require('../services/users');
const jwt = require('jsonwebtoken');

function authenticationMiddleware(req, res, next) {
  try {
    const decodedToken = jwt.verify(req.cookies.Token, 'secret');
    const userId = decodedToken.data.userId;
    userService.getUserById(userId)
      .then(user => {
        if (user) {
          delete user.password;
          req.user = user;
        }
        next();
      });
  }
  catch (e) {
    next();
  }
}

module.exports = function() {
  return authenticationMiddleware;
};
