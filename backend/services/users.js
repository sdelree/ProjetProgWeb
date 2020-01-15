const database = require('../database/connection');

const db = database.connect();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/wheretopark`,
    {useNewUrlParser: true, useUnifiedTopology: true});

const Users = new mongoose.Schema({
  _id: {
    type: Number,
    required: 'id du user'
  },
  pseudo: {
    type: String,
    required: 'pseudo de la personne?'
  },
  password: {
    type: double,
    required: 'mot de passe de la personne'
  }
});
const usersModel = mongoose.model('Users', Users);

function getUserById(userId) {
  return new Promise((resolve, reject)=>{
    usersModel.find( {_id: userId}, (error, user)=>{
      resolve(user);
    });
  });
}

function getUserByPseudo(pseudo) {
  return new Promise((resolve, reject)=>{
    usersModel.find( {pseudo}, (error, user)=>{
      resolve(user);
    });
  });
}

function createUser(pseudo, password) {
  const user = new usersModel({pseudo, password});
  return new Promise((resolve, reject) =>{
    user.save(err => {
      resolve();
    });
  });
}

function deleteUser(userId) {
  const user = new usersModel({_id: userId});
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
