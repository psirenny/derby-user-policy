var validators = require('./validators');

module.exports = function (app) {
  app.on('model', function (model) {
    model.fn('$validate.user.signin.form.errors', validators.signin.form);
    model.fn('$validate.user.signin.usernameOrEmail.errors', validators.signin.usernameOrEmail);
    model.fn('$validate.user.signup.form.errors', validators.signup.form);
    model.fn('$validate.user.signup.email.errors', validators.signup.email);
    model.fn('$validate.user.signup.password.errors', validators.signup.password);
    model.fn('$validate.user.signup.username.errors', validators.signup.username);
  });
};