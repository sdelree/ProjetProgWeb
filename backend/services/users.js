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
    .then(user => user == null ? Promise.resolve() : Promise.reject(new Error('User already esists')))
    .then(_ => {
      const newUser = new UserModel({email, password});
      return newUser.save().then(user => user.toObject());
    });
}


function updateUser(userId, information) {
  return new Promise((resolve, reject) => {
    UserModel.update({email: information.email, password: information.password}, (error, user) => {
      resolve(user);
    });
  });
}


function deleteUserByEmail(email) {
  return getUserByEmail(email)
    .then(user => user.remove);
}

function deleteUserById(userId) {
  return getUserById(userId)
    .then(user => user.remove);
}


module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUserByEmail,
  deleteUserById
};
