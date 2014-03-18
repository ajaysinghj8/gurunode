
 objectId = require('mongodb').ObjectID;

exports.add = function(req, res, next) {
 
  var newuser = new req.db.User({
  	displayName : req.body.name? req.body.name :"Guest",
    regno : req.body.regno,
  	password : req.body.password
  });
  newuser.save(function(err,doc) {
    if (err) next(err);
    res.json("User Created Successfully. "+ doc );
  });
};

 exports.show = function (req,res,next) {
     req.db.User.findOne({ _id : req.params.id },function   (err,doc) {
        if(err) res.send("Error show User");
        else res.render('users/user',{User : doc});
     });

 };
 exports.showall =function   (req,res,next) {
      req.db.User.find({},function   (err,docs) {
             if (err) res.send(err);
             else res.render('users/index',{Users : docs});
           });
    };

exports.updates = function   ( req,res,next) {
    var b = req.body;
    req.db.User.findByIdAndUpdate(req.params.id,{ 
                                       displayName: b.name
                                      ,  regno : b.regno                    
                                      ,  email: b.email                                      
                                      ,  image: b.image
                                      ,  updated: new Date()
                                       
},{new : true},   function   (err,doc) {
       if(err) res.send("error updating user"+err);
       else res.send("user Updated" + doc);
    });
 };
 
 exports.edit = function   ( req,res,next) {
    req.db.User.findOne({_id : req.params.id},function   ( err,doc) {
       if(err) res.send("Error edit User");
       else res.render('users/edit',{User : doc});
    });    
 };
 exports.deletes = function   ( req,res,next) {
    req.db.User.findByIdAndRemove(req.params.id , function   ( err,docs) {
       if(err) res.send("error delete User");
       else res.send("User deleted " + docs);
    });
 };
 