exports.show = function   (req,res,next ) {
   req.db.Guru.findById(req.params.id,function   (err,doc ) {
   	 if(err) res.send("error");
   	 else res.render('report',{req : req,Guru : doc}); 
   }); 
};