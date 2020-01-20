const jwt = require('jsonwebtoken');

/**
 * Returns the secret to use to sign JWT tokens.
 * It tris to get the secret from JWT_SIGN env variable. If it is not present, it falls back to a test value.
 */
function getSecret() {
  return process.env.JWT_SIGN || 'thatsAReallyStrongSecretThatIsHardToFind';
}

/**
 * Creates an authentication token for a user.
 * @param {string} userId The is of the user the token is created for.
 * @return {Promise<string>} The token.
 */
function createToken(userId) {
  return new Promise((resolve, reject) =>
    jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {
        userId
      }
    },  getSecret(), {}, (err, token) => err ? reject(err) : resolve(token))
  );
}

/**
 * Validates and decodes a JWT token.
 * @param token The token to validate.
 * @return {Promise<*>} The token's content.
 */
function validateToken(token) {
  return new Promise((resolve, reject) =>
    jwt.verify(token, getSecret(), {}, (err, decoded) => err ? reject(err) : resolve(decoded))
  );
}

const COOKIE_STORE_NAME = 'Token';

module.exports = {
  createToken,
  validateToken,
  COOKIE_STORE_NAME
};
