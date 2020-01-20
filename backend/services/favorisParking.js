const database = require('../database/connection');

const mongoose = database.getMongoose();

const Favorites = mongoose.Schema({
  name: {
    type: String,
    required: 'Nom du parking'
  },
  userId: {
    type: Number,
    required: 'identifiant utilisateur'
  },
  latitude: {
    type: Number,
    required: ' Latitude du parking'
  },
  longitude: {
    type: Number,
    required: ' Longitude du parking'
  }
});

const favoriteModel = mongoose.model('parking', Favorites);

function getFavoritesByUser(userId) {
  return new Promise((resolbe, reject) =>{
    favoriteModel.find( {userId}, (error, favorite)=>{
      resolve(favorite);
    });
  });
}
function getFavoritesByName(userIdn, name) {
  return new Promise((resolbe, reject) =>{
    favoriteModel.find( {userIdn, name}, (error, favorite)=>{
      resolve(favorite);
    });
  });
}

function createFavorite(name, userId, latitude, longitude) {
  const parking = new favoriteModel({name, userId, latitude, longitude});
  return new Promise((resolve, reject) =>{
    parking.save(err => {
      resolve();
    });
  });
}

function updateFavorites(userId, information) {
  return new Promise((resolve, reject)=>{
    this.update({name: information.name, userId,
      latitude: information.latitude,
      longitude: information.longitude}, (error, vehicles)=>{
      resolve(vehicles);
    });
  });
}

function getFavoritesNumber(userId) {
  return new Promise((resolbe, reject) =>{
    favoriteModel.find( {userId}, (error, favorite)=>{
      resolve(favorite);
    }).size();
  });
}

function deleteFavoriteParking(userId, name) {
  return new Promise((resolve, reject) =>{
    getFavoritesByUser(userId)
      .then(favoriteParkings => {
        favoriteParkings.remove({name}), err => {
          resolve();
        };
      });
  });
}

module.exports = {
  createFavorite,
  getFavoritesByUser,
  getFavoritesByName,
  getFavoritesNumber,
  updateFavorites,
  deleteFavoriteParking
};
