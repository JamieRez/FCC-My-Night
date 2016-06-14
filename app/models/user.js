var mongoose = require('mongoose');

var userSchema = mongoose.Schema ({
  googleId : String,
  name : String,
  email : String
});


module.exports = mongoose.model('User' , userSchema);
