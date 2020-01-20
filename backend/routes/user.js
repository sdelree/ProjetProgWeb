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
router.put('/update/', (req, res) =>{
  const email = req.body.email;
  const password = req.body.password;
  const userId = req.user._id;
  userServices.getUserByEmail(email)
    .then(user=>{
      if ( user !== null) {
        userServices.updateUser(userId, {email, password})
          .then(user=>res.send(user))
          .catch(err => res.status(401).send(err));
      } else {
        return Promise.reject(new Error('This user doesn\'t exist'));
      }
    })
    .catch(err => res.status(401).send(err));
});

// DELETE
router.delete('/delete/:userId', (req, res) =>{
  const userId = req.params.userId;
  userServices.getUserById(userId)
    .then(user => {
      if (user !== null) {
        userServices.deleteUserById(userId)
          .then(deletedUser => res.send(deletedUser))
          .catch(err => res.status(401).send(err));
      } else {
        return Promise.reject(new Error('This user doesn\'t exist'));
      }
    })
    .catch(err => res.status(401).send(err));
});

router.delete('/delete/:email', (req, res) =>{
  const email = req.params.email;
  userServices.getUserByEmail(email)
    .then(user => {
      if (user !== null) {
        userServices.deleteUserByEmail(email)
          .then(deletedUser => res.send(deletedUser))
          .catch(err => res.status(401).send(err));
      } else {
        return Promise.reject(new Error('This user doesn\'t exist'));
      }
    })
    .catch(err => res.status(401).send(err));
});
