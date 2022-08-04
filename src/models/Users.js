const mongoose = require("mongoose");
require('dotenv').config()
const { MONGO_URI } = require('../config/global')

mongoose.connect(MONGO_URI, {
  useNewUrlParser:true,
  useUnifiedTopology:true
  }, () => console.log(' mongo Connected'))

const usersCollecion = 'users';

const usersSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    age: {type: String, required: true, max: 3},
    address: {type: String, required: true, max: 300},
    cellphone: { type: Number, defaul:000000000000, max: 9999999999999},
    imgAvatar: {type: String, required: false, max: 300},
    password: {type: String, required: true, max: 100}

});

const users = mongoose.model(usersCollecion, usersSchema);

module.exports = users