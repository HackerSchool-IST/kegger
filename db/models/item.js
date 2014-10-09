var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  timestamp: String,
  type: String
});

itemSchema.statics.number = function (typeS, cb) {
  this.count({type : typeS},cb);
};

itemSchema.statics.countWithId = function (itemId, cb) {
  this.count({_id : itemId},cb);
}
itemSchema.statics.findAll = function (cb) {
  this.find({}, cb);
};

itemSchema.statics.remv = function(itemId,cb){
  this.remove({_id:itemId},cb);
}

var item = module.exports = mongoose.model('item', itemSchema);
