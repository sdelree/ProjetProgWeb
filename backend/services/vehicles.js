const database = require('../database/connection');

const mongoose = database.getMongoose();

const Vehicles = mongoose.Schema({
  _id: {
    type: Number,
    required: 'ID du véhicule'
  },
  userId: {
    type: Number,
    required: 'ID du propriétaire du véhicule'
  },
  isElectric: {
    type: String,
    required: 'Type de véhicule de la personne?'
  },
  height: {
    type: Number,
    required: 'Le Gabari du véhicule'
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


function getVehiclesById(vehicleId) {
  return new Promise((resolve, reject) =>{
    VehiclesModel.find( {_id: vehicleId}, (error, vehicles)=>{
      resolve(vehicles);
    });
  });
}


function createVehicle(userId, isElectric, height) {
  const vehicle = new VehiclesModel({userId, isElectric, height});
  return new Promise((resolve, reject) =>{
    vehicle.save(err => {
      resolve();
    });
  });
}

function deleteVehicle(vehicleId) {
  const vehicle = new VehiclesModel({_id: vehicleId});
  return new Promise((resolve, reject) =>{
    vehicle.save(err => {
      resolve();
    });
  });
}


module.exports = {
  getVehiclesByOwner,
  getVehiclesById,
  createVehicle,
  deleteVehicle
};
