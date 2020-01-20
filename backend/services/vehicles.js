const database = require('../database/connection');

const mongoose = database.getMongoose();

const Vehicle = mongoose.Schema({
  name: {
    type: String,
    required: 'Nom du véhicule'
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

const VehicleModel = mongoose.model('Vehicle', Vehicle);

function getVehiclesByOwner(userId) {
  return new Promise((resolve, reject) => {
    VehicleModel.find({userId}, (error, vehicles) => {
      resolve(vehicles);
    });
  });
}
function getVehiclesByName(userId, name) {
  return new Promise((resolve, reject) => {
    VehicleModel.find({userId, name}, (error, vehicles) => {
      resolve(vehicles);
    });
  });
}


function getVehiclesById(vehicleId) {
  return new Promise((resolve, reject) =>{
    VehicleModel.find( {_id: vehicleId}, (error, vehicles)=>{
      resolve(vehicles);
    });
  });
}


function createVehicle(userId, name, isElectric, height) {
  const vehicle = new VehicleModel({userId, name, isElectric, height});
  return new Promise((resolve, reject) =>{
    vehicle.save(err => {
      resolve();
    });
  });
}

function updateVehicle(vehicleId, information ) {
  return new Promise((resolve, reject)=>{
    this.update({isElectric: information.isElectric, height: information.height}, (error, vehicles)=>{
      resolve(vehicles);
    });
  });
}


function deleteVehicle(vehicleId) {
  return new Promise((resolve, reject) =>{
    getVehiclesById(vehicleId)
        .then(vehicle=> vehicle.remove(), err => {
          resolve();
        });
  });
}


module.exports = {
  getVehiclesByOwner,
  getVehiclesById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehiclesByName
};
