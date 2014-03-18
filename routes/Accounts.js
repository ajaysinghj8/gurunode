exports.checkAdmin = function(request, response, next) {
  if (request.session && request.session.auth && request.session.UserId && request.session.admin) {
    console.info('Access ADMIN: ' + request.session.UserId);
    return next();
  } else {
    next('User is not an administrator.');
  }
};

exports.checkUser = function(req, res, next) {
  if (req.session && req.session.auth && req.session.UserId && (req.session.User.approved || req.session.admin)) {
    console.info('Access USER: ' + req.session.UserId);
    return next();
  } else {
    next('User is not logged in.');
  }
};

exports.checkApplicant = function(req, res, next) {
  if (req.session && req.session.auth && req.session.UserId && (!req.session.User.approved || req.session.admin)) {
    console.info('Access USER: ' + req.session.UserId);
    return next();
  } else {
    next('User is not logged in.');
  }
};

exports.login = function(req, res, next) {
  req.db.User.findOne({
      regno : req.body.regno,
      password: req.body.password
    },
    null, {
      safe: true
    },
    function(err, User) {
      if (err) return next(err);
      if (User) {
            req.session.auth = true;
            req.session.UserId = User._id.toHexString();
            req.session.User = User;
            if (User.admin) 
            req.session.admin = true;
        
            console.info('Login USER: ' + req.session.UserId);
            res.json(200, { msg: 'Authorized' });
            res.redirect('/');

      } else {
        next(new Error('User is not found.'));
      }
    });
};

exports.logout = function(req, res) {
  console.info('Logout USER: ' + req.session.UserId);
  req.session.destroy(function(error) {
    if (!error) {
      res.send({
        msg: 'Logged out'
      });
    }
  });
};

exports.profile = function(req, res, next) {
  req.db.User.findById(req.session.UserId, 'firstName lastName displayName headline photoUrl admin approved banned role angelUrl twitterUrl facebookUrl linkedinUrl githubUrl', function(err, obj) {
    if (err) next(err);
    if (!obj) next(new Error('User is not found'));
    req.db.Post.find({
      author: {
        id: obj._id,
        name: obj.displayName
      }
    }, null, {
      sort: {
        'created': -1
      }
    }, function(err, list) {
      if (err) next(err);
      obj.posts.own = list || [];
      req.db.Post.find({
        likes: obj._id
      }, null, {
        sort: {
          'created': -1
        }
      }, function(err, list) {
        if (err) next(err);
        obj.posts.likes = list || [];
        req.db.Post.find({
          watches: obj._id
        }, null, {
          sort: {
            'created': -1
          }
        }, function(err, list) {
          if (err) next(err);
          obj.posts.watches = list || [];
          req.db.Post.find({
            'comments.author.id': obj._id
          }, null, {
            sort: {
              'created': -1
            }
          }, function(err, list) {
            if (err) next(err);
            obj.posts.comments = [];
            list.forEach(function(value, key, list) {
              obj.posts.comments.push(value.comments.filter(function(el, i, arr) {
                return (el.author.id.toString() == obj._id.toString());
              }));
            });
            res.json(200, obj);
          });
        });
      });
    });
  });
};

exports.delProfile = function(req, res, next) {
  console.log('del profile');
  console.log(req.session.UserId);
  req.db.User.findByIdAndRemove(req.session.User._id, {}, function(err, obj) {
    if (err) next(err);
    req.session.destroy(function(error) {
      if (err) {
        next(err)
      }
    });
    res.json(200, obj);
  });
};