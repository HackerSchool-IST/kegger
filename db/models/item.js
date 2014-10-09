var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  timestamp: String,
  type: String
});

itemSchema.statics.number = function (typeS, cb) {
  this.count({type : typeS},cb);
};

itemSchema.statics.findAll = function (cb) {
  this.find({}, cb);
};

var item = module.exports = mongoose.model('item', itemSchema);
