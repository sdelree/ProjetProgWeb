const database = require('../database/connection');

const db = database.connect();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/wheretopark`,
  {useNewUrlParser: true, useUnifiedTopology: true});

const Vehicles =  mongoose.Schema({
  _id:{
    type: Number,
    required :"ID du véhicule"
  },
  userId:{
    type : Number,
    required :"ID du propriétaire du véhicule"
  },
  isElectric:{
    type : String,
    required: "Type de véhicule de la personne?"
  },
  height:{
    type: Number,
    required :"Le Gabari du véhicule"
  }
});

const VehiclesModel = mongoose.model('Vehicule', Vehicles);

function getVehiclesByOwner(userId) {
  return new Promise((resolve, reject) => {
    VehiclesModel.find({userId}, (error, vehicles) => {
      resolve(vehicles);
    });
  });
}

module.exports = {
  getVehiclesByOwner,
};
