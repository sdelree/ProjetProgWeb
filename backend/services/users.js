const database = require('../database/connection');

const mongoose = database.getMongoose();

const User = new mongoose.Schema({
  email: {
    type: String,
    required: 'email de la personne?'
  },
  password: {
    type: String,
    required: 'mot de passe de la personne'
  }
});
const UserModel = mongoose.model('User', User);

function getUserById(userId) {
  return UserModel.findOne({_id: userId}).exec();
}

function getUserByEmail(email) {
  return UserModel.findOne({email}).exec();
}

function createUser(email, password) {
  return getUserByEmail(email)
    .then(user => user == null ? Promise.resolve() : Promise.reject('User already esists'))
    .then(_ => {
      const newUser = new UserModel({email, password});
      return newUser.save();
    });
}

function updateUserEmail(userId,email){
  return new Promise((resolve, reject) => {
    VehicleModel.update({email}, (error, vehicles) => {
      resolve(vehicles);
    });
  });
}

function updateUserPassword(userId,password){
  return new Promise((resolve, reject) => {
    VehicleModel.update({password}, (error, vehicles) => {
      resolve(vehicles);
    });
  });
}


function deleteUserByEmail(email) {
  return getUserByEmail(email)
      .then(user => user.remove);
}


module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  updateUserEmail,
  updateUserPassword,
  deleteUserByEmail
};
