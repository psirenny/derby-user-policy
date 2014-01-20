var validators = require('../app/validators');

module.exports = function (app, options) {
  return function () {
    app.post('/user/changeEmail', function (req, res, next) {
      var model = req.getModel()
        , email = req.body.email
        , schema = model.get('$validate.user.schema')
        , $email = model.query('usersPrivate', {'local.emails.value': email});

      $email.fetch(function (err) {
        if (err) return next(err);
        var errors = validators.changeEmail.email(email, $email.get(), schema);
        if (errors.length) return res.json(400, {errors: errors});
        next();
      });
    });

    app.post('/user/changePassword', function (req, res, next) {
      var model = req.getModel()
        , confirmPassword = req.body.confirmPassword
        , password = req.body.email
        , schema = model.get('$validate.user.schema')
        , errors = validators.changePassword.password(password, confirmPassword, schema);

      if (errors.length) return res.json(400, {errors: errors});
      next();
    });

    app.post('/user/changeUsername', function (req, res, next) {
      var model = req.getModel()
        , username = req.body.username
        , schema = model.get('$validate.user.schema')
        , $username = model.query('usersPrivate', {'local.username': username});

      $username.fetch(function (err) {
        if (err) return next(err);
        var errors = validators.changeUsername.username(username, $username.get(), schema);
        if (errors.length) return res.json(400, {errors: errors});
        next();
      });
    });

    app.post('/user/resetPassword', function (req, res, next) {
      var model = req.getModel()
        , confirmPassword = req.body.confirmPassword
        , password = req.body.email
        , schema = model.get('$validate.user.schema')
        , errors = validators.resetPassword.password(password, confirmPassword, schema);

      if (errors.length) return res.json(400, {errors: errors});
      next();
    });

    app.post('/user/signup', function (req, res, next) {
      var model = req.getModel()
        , email = req.body.email
        , password = req.body.password
        , schema = model.get('$validate.user.schema')
        , username = req.body.username
        , $email = model.query('usersReserved', {'local.email': email})
        , $username = model.query('usersPublic', {'local.username':  username});

      model.fetch($email, $username, function (err) {
        if (err) return next(err);
        var errors = validators.signup.form(email, $email.get(), password, username, $username.get(), schema);
        if (errors.length) return res.json(400, {errors: errors});
        next();
      });
    });

    return function (req, res, next) {
      next();
    };
  };
};