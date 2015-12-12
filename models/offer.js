
'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let offerSchema = mongoose.Schema({
    to: {type: Schema.Types.ObjectId, ref: 'users'},
    for: {type: Schema.Types.ObjectId, ref: 'items'},
    from: {type: Schema.Types.ObjectId, ref: 'users'},
    offer: {type: Schema.Types.ObjectId, ref: 'items'},
    comment: String,
    accepted: Boolean,
    updated: {type: Date, default: Date.now},
  });

module.exports = mongoose.model('offers', offerSchema);
