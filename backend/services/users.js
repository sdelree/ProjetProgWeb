const database = require('../database/connection');

const mongoose = database.getMongoose();

const User = new mongoose.Schema({
  nickname: {
    type: String,
    required: 'pseudo de la personne?'
  },
  password: {
    type: String,
    required: 'mot de passe de la personne'
  }
});
const UserModel = mongoose.model('User', User);

function getUserById(userId) {
  return new Promise((resolve, reject)=>{
    UserModel.findOne( {_id: userId}, (err, user) => {
      resolve(user);
    });
  });
}

function getUserByNickname(nickname) {
  return new Promise((resolve, reject) => {
    UserModel.findOne( {nickname}, (err, user) => {
      resolve(user);
    });
  });
}

function createUser(nickname, password) {
  return getUserByNickname(nickname).then(
    user => {
      return new Promise((resolve, reject) => {
        if (user) {
          reject('Useer already exists');
        } else {
          const newUser = new UserModel({nickname, password});
          newUser.save(err => {
            resolve();
          });
        }
      });
    }
  );

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
  getUserByPseudo: getUserByNickname,
  createUser,
  deleteUser
};
