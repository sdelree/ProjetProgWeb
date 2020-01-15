const database = require('../database/connection');

const db = database.connect();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/wheretopark`,
  {useNewUrlParser: true, useUnifiedTopology: true});

const UserModel = new mongoose.Schema({
  _id : {
    type : Number,
    required: "id du user"
  },
  pseudo:{
    type : String,
    required: "pseudo de la personne?"
  },
  password:{
    type: double,
    required :"mot de passe de la personne"
  }
});
