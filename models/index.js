var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
	  user_id: { type: Schema.Types.ObjectId, ref: 'users' }
  , text: { type: String, trim: true,max:2000}
  , guruid: { type: Schema.Types.ObjectId, ref: 'Guru' }
  , created_at : { type : Date, default : Date.now }
  , enable     : { type : Boolean, default : true }
  , likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  , own: Boolean
  , like: Boolean
  , admin: Boolean
  , action: String  
});
 
var GuruSchema = new Schema ({
    Name : String
   ,College : String
   ,Designation : String
   ,Department  : String
   ,Specialization : String
   ,Picture :String
   ,Voters : { type : Number , default : 0 }
   ,Rating : { type : Number , default : 0 }
   ,created_at  : { type : Date, default : Date.now }

 });


var UserSchema = new Schema({

     displayName: { type: String,trim: true}
  ,  regno : { type:Number, require:true,unique:true}
  ,  password: String
  ,  email: { type: String,trim: true}
  ,  approved: {type: Boolean,default: true}
  ,  banned: {type: Boolean,default: false}
  ,  admin: {type: Boolean,default: false}
  ,  image: String
  ,  created: { type: Date,  default: Date.now }
  ,  updated: { type: Date, default: Date.now  }
  ,  own: Boolean
  ,  Comments : {own: [Schema.Types.Mixed]
  	         , likes: [Schema.Types.Mixed]
              }
});

exports.User = mongoose.model('User',UserSchema);
exports.Guru = mongoose.model('Guru',GuruSchema);
exports.Comments = mongoose.model('Comments',CommentsSchema);