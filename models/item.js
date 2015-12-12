
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let itemSchema = mongoose.Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'users'},
    name: {type: String, required: true},
    description: String,
    location: String,
    picture: String,
    forSale: Boolean,
    updated: {type: Date, default: Date.now},
  });

module.exports = mongoose.model('items', itemSchema);
