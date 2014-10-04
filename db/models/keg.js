var mongoose = require('mongoose');

var kegSchema = new mongoose.Schema({
  timestamp: String,
});

ticketSchema.statics.count = function (cb) {
  this.count({}, cb);
};

ticketSchema.statics.findAll = function (cb) {
  this.find({}, cb);
};

var Keg = module.exports = mongoose.model('beer', kegSchema);
