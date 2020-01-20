const database = require('../database/connection');

const mongoose = database.getMongoose();

mongoose.ObjectId.get(v => v ? v.toString() : v);

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
  return favoriteModel.find( {userId} ).exec();
}

function getFavoritesByName(userIdn, name) {
  return favoriteModel.find( {userIdn, name} ).exec();
}

function createFavorite(name, userId, latitude, longitude) {
  const parking = new favoriteModel({name, userId, latitude, longitude});
  return parking.save();
}

function updateFavorites(userId, information) {
  return favoriteModel.findByIdAndUpdate(userId, {name: information.name, userId,
    latitude: information.latitude,
    longitude: information.longitude}).exec();
}

function getFavoritesNumber(userId) {
  return favoriteModel.find( {userId}).exec().size();
}

function deleteFavoriteParking(userId, name) {
  return favoriteModel.deleteOne({userId, name}).exec();
}

module.exports = {
  createFavorite,
  getFavoritesByUser,
  getFavoritesByName,
  getFavoritesNumber,
  updateFavorites,
  deleteFavoriteParking
};
