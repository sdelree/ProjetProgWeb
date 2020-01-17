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
  return new Promise((resolve, reject)=>{
    UserModel.findOne( {_id: userId}, (err, user) => {
      resolve(user);
    });
  });
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    UserModel.findOne( {email}, (err, user) => {
      resolve(user);
    });
  });
}

function createUser(email, password) {
  return getUserByEmail(email).then(
    user => {
      return new Promise((resolve, reject) => {
        if (user) {
          reject('Useer already exists');
        } else {
          const newUser = new UserModel({email, password});
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
  getUserByEmail,
  createUser,
  deleteUser
};
