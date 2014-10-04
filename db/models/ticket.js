var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
  timestamp: String,
});

ticketSchema.statics.count = function (cb) {
  this.count({}, cb);
};

ticketSchema.statics.findAll = function (cb) {
  this.find({}, cb);
};

var Ticket = module.exports = mongoose.model('beer', ticketSchema);
