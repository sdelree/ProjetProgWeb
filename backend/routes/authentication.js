const express = require('express');
const router = express.Router();
const userService = require('../services/users');

router.post('/', (req, res) => {
  const {email, password, ..._} = req.body;
  userService.createUser(email, password)
    .then(user => res.send(user))
    .catch(err => res.status(500).send());
});

module.exports = router;
