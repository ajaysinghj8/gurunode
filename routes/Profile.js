exports.show = function   (req,res,next) {
	 req.db.Guru.findOne({_id :req.params.id},function ( err,doc1) {
            req.db.Comments.find({guruid : req.params.id},function   ( err,doc2) {
	 	   if (err) res.send("error show profile routes");
	 	   else  res.render('profile',{req : req , Guru : doc1 ,Comments : doc2});
	 	      
            });
	 });
};
exports.comments = function   ( req,res,next) {
	 new req.db.Comments({ text : req.body.commentText
	                    ,_gid:  req.params.id    
	                    ,_uid: req.session.UserId                         
                        }).save(function  (err,doc){
	                                                 	 if(err)res.send(err);
	                                             
	                                                 	 else res.redirect('/profile/'+req.params.id);
	                                                        console.log(doc);
	                                                 });
	  
};
exports.like = function   ( req,res,next) {
	res.send("like");
	 		
};
exports.dislike = function   ( req,res,next) {
	 		res.send("dislike");		
};
 