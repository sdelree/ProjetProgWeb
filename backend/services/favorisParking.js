const database = require('../database/connection');

const mongoose = database.getMongoose();

const Favoris = mongoose.Schema({
  name: {
    type: String,
    required: 'Nom du parking'
  },
  latitude:{
    type: Number,
    required:" Latitude du parking"
  },
  longitude:{
    type: Number,
    required:" Longitude du parking"
  }
});

const favorisModel = mongoose.model('parking', Favoris);


module.exports = {

};
