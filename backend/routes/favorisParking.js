const express = require('express');
const router = express.Router();
const favorisServices = require('../services/favorisParking');


// GETS



//POST
router.post('/create', (req, res) =>{
  // TODO : récuperer l'id du user Authentifié
  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  favorisServices.createFavoris(name, latitude, longitude).then(favoris=>res.send(favoris));
});


//PUT



//DELETE
