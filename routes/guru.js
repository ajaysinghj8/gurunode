/*

functionalities Defined In this Model
  
  add -  (new guru inserted ) 
  show - (showing a guru based on req.param.id)
  showall - (show all guru)
  edit - (editing a guru based on id)
  updates - (updating a guru based on id)
  deletes - (deleting a guru based on id)
  */

 exports.add = function (req,res,next){
 	var b = req.body;
 	var newGuru = new req.db.Guru({
  	   Name : b.name 
      ,College : b.college
      ,Designation : b.designation
      ,Department  : b.department
      ,Specialization :b.specialization
      ,Picture :b.Picture
  	   });
  newGuru.save(function(err,doc) {
    if (err) next(err);
    res.json("Guru Created Successfully. "+ doc );
  });
 };
 exports.show = function (req,res,next) {
     req.db.Guru.findOne({ _id : req.params.id },function   (err,doc) {
        if(err) res.send("Error show guru");
        else res.render('guru/guru',{Guru : doc});
     });

 };
 exports.showall =function   (req,res,next) {
      req.db.Guru.find({},function   (err,docs) {
             if (err) res.send(err);
             else res.render('guru/index',{Guru : docs});
           });
    };
 exports.edit = function   ( req,res,next) {
    req.db.Guru.findOne({_id : req.params.id},function   ( err,doc) {
       if(err) res.send("Error edit guru");
       else res.render('guru/edit',{Guru : doc});
    });    
 };


 exports.updates = function   ( req,res,next) {
    var b = req.body;
    req.db.Guru.findByIdAndUpdate(req.params.id,{ 
                                       Name : b.name 
                                      ,College : b.college
                                      ,Designation : b.designation
                                      ,Department  : b.department
                                      ,Specialization :b.specialization
                                      ,Picture : b.Picture
},{new : true},   function   (err,doc) {
       if(err) res.send("error updating guru");
       else res.send("Guru Updated" + doc);
    });
 };

 exports.deletes = function   ( req,res,next) {
    req.db.Guru.findByIdAndRemove(req.params.id , function   ( err,docs) {
       if(err) res.send("error delete guru");
       else res.send("Guru deleted " + docs);
    });
 };
