const express = require('express');
const router = express.Router();
const favoriteServices = require('../services/favorites');


// GETS
router.get('/', (req, res) => {
  const userId = req.user._id;
  favoriteServices.getFavoritesByUser(userId)
    .then(favorites=>res.send(favorites))
    .catch(err => res.status(401).send(err));
});

// POST
router.post('/', (req, res) =>{
  const name = req.body.name;
  const userId = 1;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  favoriteServices.getFavoritesNumber(userId)
    .then(size=>{
      if (size < 10) {
        favoriteServices.createFavorite(name, userId, latitude, longitude)
          .then(favorite=>res.send(favorite))
          .catch(err => res.status(401).send(err));
      } else {
        return Promise.reject(new Error('There is already 10 Favorites parkings'));
      }
    })
    .catch(err => res.status(401).send(err));
});

// PUT
router.put('/:id', (req, res) =>{
  const id = req.params.id;
  const userId = req.user._id;
  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  favoriteServices.getFavoritesByName(userId, name)
    .then( favorite =>{
      if (favorite != null) {
        favoriteServices.updateFavorites(id)
          .then(vehicle => {
            favoriteServices.updateFavorites(vehicle._id, {name, latitude, longitude})
              .then(updatedVehicle => res.send(updatedVehicle))
              .catch(err => res.status(401).send(err));
          })
          .catch(err => res.status(401).send(err));
      } else {
        return Promise.reject(new Error('This Parking doesn\'t exist'));
      }
    })
    .catch(err => res.status(401).send(err));
});

// DELETE
router.delete('/:id', (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  favoriteServices.getFavoriteById(id)
    .then(parking=>{
      if (parking !== null) {
        favoriteServices.deleteFavoriteParking(userId, name)
          .then(favorite=> res.send(favorite))
          .catch(err => res.status(401).send(err));
      } else {
        return Promise.reject(new Error('This Parking doesn\'t exist'));
      }
    })
    .catch(err => res.status(401).send(err));
});

module.exports = router;
