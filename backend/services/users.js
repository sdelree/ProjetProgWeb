const database = require('../database/connection');

const mongoose = database.getMongoose();

const User = new mongoose.Schema({
  _id: {
    type: Number,
    required: 'id du user'
  },
  pseudo: {
    type: String,
    required: 'pseudo de la personne?'
  },
  password: {
    type: Number,
    required: 'mot de passe de la personne'
  }
});
const UserModel = mongoose.model('User', User);

function getUserById(userId) {
  return new Promise((resolve, reject)=>{
    UserModel.find( {_id: userId}, (error, user)=>{
      resolve(user);
    });
  });
}

function getUserByPseudo(pseudo) {
  return new Promise((resolve, reject)=>{
    UserModel.find( {pseudo}, (error, user)=>{
      resolve(user);
    });
  });
}

function createUser(pseudo, password) {
  const user = new UserModel({pseudo, password});
  return new Promise((resolve, reject) =>{
    user.save(err => {
      resolve();
    });
  });
}

function deleteUser(userId) {
  const user = new UserModel({_id: userId});
  return new Promise((resolve, reject) =>{
    user.remove(err => {
      resolve();
    });
  });
}


module.exports = {
  getUserById,
  getUserByPseudo,
  createUser,
  deleteUser
};
