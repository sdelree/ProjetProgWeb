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
  return UserModel.findById(userId).exec();
}

function getUserByEmail(email) {
  return UserModel.findOne({email}).exec();
}

function createUser(email, password) {
  return getUserByEmail(email)
    .then(user => user == null ? Promise.resolve() : Promise.reject(new Error('User already exists')))
    .then(_ => {
      const newUser = new UserModel({email, password});
      return newUser.save().then(user => user.toObject());
    });
}


function updateUser(userId, information) {
  return UserModel.findByIdAndUpdate({email: information.email, password: information.password}, {new: true}).exec();
}


function deleteUserByEmail(email) {
  return UserModel.deleteOne({email}).exec();
}

function deleteUserById(userId) {
  return UserModel.deleteOne({userId}).exec();
}


module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUserByEmail,
  deleteUserById
};
