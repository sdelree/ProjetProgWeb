const database = require('../database/connection');

const mongoose = database.getMongoose();

const Vehicle = mongoose.Schema({
  _id: {
    type: Number,
    required: 'ID du véhicule'
  },
  vehicleName:{
    type: String,
    required:"Nom du véhicule"
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
function getVehiclesByName(vehicleName) {
  return new Promise((resolve, reject) => {
    VehicleModel.find({vehicleName}, (error, vehicles) => {
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


function createVehicle(userId, isElectric, height) {
  const vehicle = new VehicleModel({userId, isElectric, height});
  return new Promise((resolve, reject) =>{
    vehicle.save(err => {
      resolve();
    });
  });
}

function deleteVehicle(vehicleId) {
  const vehicle = new VehicleModel({_id: vehicleId});
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
  deleteVehicle,
  getVehiclesByName
};
