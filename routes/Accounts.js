/*

functionalities Defined In this Model

login - (Simple user or admin Login System [session creation])
logout - (Simple user or admin logout System [session ends])
checkAdmin - (check sesssion for an administrator)
checkUser - (check session for an user)
checkApplicant -(new user registration prerequisits)

*/


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
               {req.session.admin = true;
                console.info('Login Admin: ' + req.session.UserId +"-"+ req.session.User.displayName);
                res.json(200, { msg: 'Authorized' });
                res.redirect('/admin');
                }
           else { console.info('Login USER: ' + req.session.UserId +"-"+ req.session.User.displayName);
                  res.json(200, { msg: 'Authorized' });
                  res.redirect('/');
                }

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
 
 