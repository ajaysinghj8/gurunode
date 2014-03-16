var express = require('express'),
    http = require('http'),
    path = require('path'),
    oauth = require('oauth')
    querystring= require('querystring'),
    routes = require('./routes');

var app = express();

// all environments
app.locals({
	//local varibles for through out website
});

//configuration 
app.configure(function   ( ) {
      app.set('port', process.env.PORT || 3000);
      app.use(express.static(path.join(__dirname, 'public')));
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'ejs');
      app.use(express.favicon());
      app.use(express.logger('dev'));
      app.use(express.json());
      app.use(express.urlencoded());
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(express.cookieParser('asd;lfkajs;ldfkj'));
      app.use(express.session({
            secret: '1234567890QWERTY',
            key: 'sid',
            cookie: {
                secret: true,
                 expires: false      
            }
      }));
      app.use(app.router);

});


//database mongodb
//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
var dbUrl = 'mongodb://un7dc6e19lae6age:94e83b20eed64b6581d1c89b4ef762af@bvisf9dkf0h3ukn9.mongo.clvrcld.net:27017/bvisf9dkf0h3ukn9';
var mongoose = require('mongoose');
mongoose.connect(dbUrl);
/*var connection = mongoose.createConnection(dbUrl);
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
  console.info('connected to database')
});*/
var models = require('./models');
function db (req, res, next) {
  req.db = {
    User : models.User,
    Comments : models.Comments,
    Guru : models.Guru
   // Comments: connection.model('Comments', models.Comments, 'Comments'),
    //User : connection.model('User',models.UserSchema)
   //, Guru : connection.model('Guru',models.Guru,'Guru')
  };
  return next();
}

// checks

checkUser = routes.Accounts.checkUser;
checkAdmin = routes.Accounts.checkAdmin;
checkApplicant = routes.Accounts.checkApplicant;

//Website
app.get('/',db,routes.Home.main);
app.get('/profile/:id',db,routes.Profile.show);
app.post('/profile/comment/:id/like',db,routes.Profile.like);
app.post('/profile/comment/:id/dislike',db,routes.Profile.dislike);
app.post('/profile/comment/:id',db,routes.Profile.comments);
app.get('/rate/:id',db,routes.Rate.show);
app.get('/report/:id',db,routes.Report.show);
app.post('/rate:/id',db,routes.Rate.updates);
//login System
    app.post('/register', db, routes.users.add);
    app.post('/login', db,routes.Accounts.login);
    app.get('/logout', routes.Accounts.logout);
    app.get('/users',function   (req,res) {
       models.User.findOne({regno : req.session.User.regno},function   (err,doc) {
         if(err)
               res.send("User Not Found");
             else
                res.send(doc);
       });
    });

//Admin Work 
    //main {
      app.get('/admin',function   ( req,res) {  res.render('admin/index');  });
    //main} 


//Guru {
        app.get('/admin/guru',db,routes.Guru.showall);
        app.get('/admin/guru/add', function (req,res) {  res.render('guru/new');   });
        app.post('/admin/guru/:id',db,routes.Guru.add);
        app.get('/admin/guru/:id',db,routes.Guru.show );
        app.get('/admin/guru/:id/edit',db,routes.Guru.edit);
        app.put('/admin/guru/:id',db,routes.Guru.updates);
        app.del('/admin/guru/:id',db,routes.Guru.deletes);
        
//Guru }

//Users {
          app.get('/admin/data1',function  (req,res) {
            models.User.find({}, function(err, docs){
             if(err) res.send("Error user all not found");
             else res.send(docs)
            });
          });
           app.get('/admin/data2',function  (req,res) {
            models.Guru.find({}, function(err, docs){
             if(err) res.send("Error user all not found");
             else res.send(docs)
            });
          });
          app.get('/admin/user/:id',function  (req,res) {
            models.User.findOne({_id : req.params.id},function   (err,doc) {
              if(err) res.send("Error single user");
              else res.render("users/user",{User: doc});
            });
          });
          app.get('/admin/user/:id/edit',function   ( req,res) {
             models.User.findOne({_id : req.params.id},function   ( err,doc) {
                if(err) res.send("Not found user");
                else res.render("users/edit",{User: doc});
             });
          });
          app.put('/admin/user/:id/edit',function   ( req,res){
            res.send("Updated");
          });
          app.del('/admin/user/:id',function   ( req,res){
            res.send("User Deleted");
          });
//user }

//server 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
