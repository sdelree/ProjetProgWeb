const express = require('express');
const router = express.Router();
const userServices = require('../services/users');

// GET
router.get('/:id', (req, res)=>{
  const userId = req.params.id;
  userServices.getUserById(userId)
              .then(user=>res.send(user))
              .catch(err => res.status(401).send(err));
});

// POST


// PUT


// DELETE
router.delete('/delete/:userId', (req, res) =>{
  const userId = req.params.userId;
  userServices.getUserById(userId)
              .then(user => {
                  userServices.deleteUserById(userId)
                              .then(deletedUser=>res.send(deletedUser))
                              .catch(err => res.status(401).send(err));
               })
              .catch(err => res.status(401).send(err));
});

router.delete('/delete/:email', (req, res) =>{
  const email = req.params.email;
  userServices.getUserByEmail(email)
              .then(user => {
                  userServices.deleteUserByEmail(email)
                              .then(deletedUser=>res.send(deletedUser))
                              .catch(err => res.status(401).send(err));
                })
              .catch(err => res.status(401).send(err));
});
