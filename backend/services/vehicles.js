const database = require('../database/connection');

const mongoose = database.getMongoose();

mongoose.ObjectId.get(v => v ? v.toString() : v);

const Vehicle = mongoose.Schema({
  name: {
    type: String,
    required: 'Nom du véhicule'
  },
  userId: {
    type: String,
    required: 'ID du propriétaire du véhicule'
  },
  isElectric: {
    type: Boolean,
    required: 'Type de véhicule de la personne?'
  },
  height: {
    type: Number,
    required: 'La hauteur du véhicule'
  }
});

const VehicleModel = mongoose.model('Vehicle', Vehicle);

function getVehiclesByOwner(userId) {
  return VehicleModel.find({userId}).exec();
}

function getVehicleByName(userId, name) {
  return VehicleModel.findOne({userId, name}).exec();
}

function getVehicleById(vehicleId) {
  return VehicleModel.findById(vehicleId).exec();
}

function createVehicle(userId, name, isElectric, height) {
  const vehicle = new VehicleModel({userId, name, isElectric, height});
  return vehicle.save();
}

function updateVehicle(vehicleId, update ) {
  return VehicleModel.findByIdAndUpdate(vehicleId, update, {new: true}).exec();
}

function deleteVehicle(vehicleId) {
  return VehicleModel.deleteOne({_id: vehicleId}).exec();
}


module.exports = {
  getVehiclesByOwner,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleByName
};
