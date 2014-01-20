var validators = require('./validators');

module.exports = function (app) {
  app.on('model', function (model) {
    model.fn('$validate.user.changeEmail.email', validators.changeEmail.email);
    model.fn('$validate.user.changePassword.confirmPassword', validators.changePassword.confirmPassword);
    model.fn('$validate.user.changePassword.form', validators.changePassword.form);
    model.fn('$validate.user.changePassword.password', validators.changePassword.password);
    model.fn('$validate.user.changeUsername.username', validators.changeUsername.username);
    model.fn('$validate.user.forgotPassword.usernameOrEmail', validators.forgotPassword.usernameOrEmail);
    model.fn('$validate.user.resetPassword.confirmPassword', validators.resetPassword.confirmPassword);
    model.fn('$validate.user.resetPassword.form', validators.resetPassword.form);
    model.fn('$validate.user.resetPassword.password', validators.resetPassword.password);
    model.fn('$validate.user.signin.form', validators.signin.form);
    model.fn('$validate.user.signin.usernameOrEmail', validators.signin.usernameOrEmail);
    model.fn('$validate.user.signup.form', validators.signup.form);
    model.fn('$validate.user.signup.email', validators.signup.email);
    model.fn('$validate.user.signup.password', validators.signup.password);
    model.fn('$validate.user.signup.username', validators.signup.username);
  });
};