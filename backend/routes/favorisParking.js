const express = require('express');
const router = express.Router();
const favorisServices = require('../services/favorisParking');


// GETS


// POST
router.post('/create', (req, res) =>{
  const name = req.body.name;
  const userId=1;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  favorisServices.getFavoritesNumber(userId)
                 .then(size=>{
                          if (size < 10) {
                            favorisServices.createFavoris(name, userId, latitude, longitude)
                                           .then(favorite=>res.send(favorite));
                          }
                        })
                 .catch(err => res.status(401).send(err));
});
// PUT


// DELETE
