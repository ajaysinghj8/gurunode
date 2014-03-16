exports.show = function   (req,res,next ) {
   req.db.Guru.findById(req.params.id,function   (err,doc ) {
   	 if(err) res.send("error");
   	 else res.render('rating',{req : req,Guru : doc}); 
   });

};

exports.updates = function   ( req,res,next) {
   //  req.db.Guru.();

   res.send("Parameters not defiened Yet");
};