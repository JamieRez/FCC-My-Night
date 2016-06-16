var mongoose = require('mongoose');

var barSchema = mongoose.Schema ({
  name : String,
  peepsGoing : {type :Number , default : 0}
});



var Bar = mongoose.model('Bar' , barSchema);

module.exports = {Bar};
