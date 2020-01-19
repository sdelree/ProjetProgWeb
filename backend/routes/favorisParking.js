const express = require('express');
const router = express.Router();
const favorisServices = require('../services/favorisParking');


// GETS



//POST
router.post('/create', (req, res) =>{
  const name = req.body.name;
  const userId=1;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  favorisServices.createFavoris(name, userId, latitude, longitude).then(favoris=>res.send(favoris));
});


//PUT



//DELETE
