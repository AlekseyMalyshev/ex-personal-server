
'use strict';

let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: String,
    address: String,
    zipcode: String,
    phone: String,
    city: String,
    state: String,
    avatar: String,
    updated: {type: Date, default: Date.now},
  });

userSchema.methods.encryptPass = function(cb) {
  bcrypt.genSalt(10, (err1, salt) => {
    console.log(err1);
    console.log(salt);
    bcrypt.hash(this.password, salt, (err2, hash) => {
      if (err1 || err2) {
        cb(err1 || err2);
      }
      else {
        this.password = hash;
        cb(null);
      }
    });
  });
}

userSchema.methods.validatePass = function(pass, cb) {
  bcrypt.compare(pass, this.password, cb);
}

userSchema.methods.token = function(cb) {
  try {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: 24 * 60 * 60});
  }
  catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = mongoose.model('users', userSchema);
