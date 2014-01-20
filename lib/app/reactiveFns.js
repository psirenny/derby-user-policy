var validators = require('./validators');

module.exports = function (app) {
  app.on('model', function (model) {
    model.fn('$validate.user.signin.form', validators.signin.form);
    model.fn('$validate.user.signin.usernameOrEmail', validators.signin.usernameOrEmail);
    model.fn('$validate.user.signup.form', validators.signup.form);
    model.fn('$validate.user.signup.email', validators.signup.email);
    model.fn('$validate.user.signup.password', validators.signup.password);
    model.fn('$validate.user.signup.username', validators.signup.username);
  });
};