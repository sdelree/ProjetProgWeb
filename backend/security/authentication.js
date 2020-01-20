/**
 * This middleware tests whether the client sent an authentication along with its request
 * and sets the property "user" on the request if this is the case.
 */

const userService = require('../services/users');
const jwtAuthenticator = require('./jwt_auth');

function authenticationMiddleware(req, res, next) {
  const token = req.cookies[jwtAuthenticator.COOKIE_STORE_NAME];
  jwtAuthenticator.validateToken(token)
    .then(decoded => {
      const userId = decoded.data.userId;
      return userService.getUserById(userId)
    })
    .then(user => {
      if (user) {
        delete user.password;
        req.user = user;
      }
      next();
    })
    .catch(err => next());
}

module.exports = function() {
  return authenticationMiddleware;
};
