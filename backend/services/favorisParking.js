const database = require('../database/connection');

const mongoose = database.getMongoose();

const Favoris = mongoose.Schema({
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

const favorisModel = mongoose.model('parking', Favoris);

function getFavoritesByUser(userId) {
  return new promise((resolbe, reject) =>{
    favorisModel.find( {userId}, (error, favoris)=>{
      resolve(favoris);
    });
  });
}

function createFavoris(name, userId, latitude, longitude) {
  const parking = new favorisModel({name, userId, latitude, longitude});
  return new Promise((resolve, reject) =>{
    parking.save(err => {
      resolve();
    });
  });
}

function getFavoritesNumber(userId) {
  return new promise((resolbe, reject) =>{
    favorisModel.find( {userId}, (error, favoris)=>{
      resolve(favoris);
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
  createFavoris,
  getFavoritesByUser,
  getFavoritesNumber,
  deleteFavoriteParking
};
