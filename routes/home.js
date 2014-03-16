exports.main  = function  (req,res) {
	req.db.Guru.find({},null,{ sort: { created_at : -1 },limit : 4},function   ( err,docs) {
	  if (err) res.send("error home routes");
	  else
	  	res.render('index',{req:req,Guru : docs});
	});
};