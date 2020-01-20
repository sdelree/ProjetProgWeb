const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const userService = require('../services/users');
const jwt = require('jsonwebtoken');

const saltPasses = 10;

router.post('/register', (req, res) => {
  const {email, password} = req.body;
  bcrypt.hash(password, saltPasses)
    .then(hash => userService.createUser(email, hash))
    .then(user => res.status(201).send({email: user.email}))
    .catch(err => res.status(409).send(err));
});

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  userService.getUserByEmail(email)
    .then(user => {
      if (user) {
        return bcrypt.compare(password, user.password)
          .then(match => {
            if (match) {
              res.cookie('Token', jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {
                  userId: user._id.toString()
                }
              }, 'secret'));
              res.send({email: user.email});
            } else {
              res.status(401).end();
            }
          });
      } else {
        res.status(401).end();
      }
    })
    .catch(err => res.status(500).end());
});

router.post('/logout', (req, res) => {
  res.cookie('Token', '', {expires: new Date(0)});
  res.status(204).end();
});

router.get('/isLoggedIn', (req, res) => {
  res.status(req.user ? 200 : 401).send(req.user ? {email: req.user.email} : undefined);
});

module.exports = router;
