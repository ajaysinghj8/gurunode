var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ratemyguru');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Comments = new Schema({
    person     : String
  , comment    : String
  , created_at : { type : Date, default : Date.now }
  , enable     : { type : boolean, default : true }
  , likes      : { type : Number, default : 0 }
  , dislikes   : { type : Number, default : 0 }
});
  
var Guru = new Schema({
    id : ObjectId
   ,Name : String
   ,college : String
   ,Designation : String
   ,Department  : String
   ,Voters : { type : Number , default : 0 }
   ,comments    : [Comments]
   ,Rating : { type : Number , default : 0 }
   ,created_at  : { type : Date, default : Date.now }

});


var UserSchema = new Schema({
	 name : String
   , email : { type : String , unique : true }
   , regno : { type : Number , require : true}
   , image : String
   , enable : { type : boolean, default: true}
   , created_on : {type : date , default : Date.now }
});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

UserProvider = function(){};



exports.User = UserProvider;  