/*

functionalities Defined In this Model

 main - (data required by home page [4 random guru,])
 show - (shows a guru ,with comments)
 comments - (saving commnets posted by users)
 ..like -
 ..dislike -
*/




exports.main  = function  (req,res) {
	req.db.Guru.find({},null,{ sort: { created_at : -1 },limit : 4},function   ( err,docs) {
	  if (err) res.send("error home routes");
	  else
	  	res.render('index',{req:req,Guru : docs});
	  		});


exports.show = function   (req,res,next) {
	 req.db.Guru.findOne({_id :req.params.id},function ( err,doc1) {
            req.db.Comments.find({_gid : req.params.id}).populate('_uid','displayName','regno').exec(function   ( err,doc2) {
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
 