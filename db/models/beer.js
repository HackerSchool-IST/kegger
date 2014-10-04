var mongoose = require('mongoose');

var beerSchema = new mongoose.Schema({
  timestamp: String,
});

beerSchema.statics.count = function (cb) {
  this.count({}, cb);
};

beerSchema.statics.findAll = function (cb) {
  this.find({}, cb);
};

var Beer = module.exports = mongoose.model('beer', beerSchema);
