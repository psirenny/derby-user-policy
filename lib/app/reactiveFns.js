var _ = require('lodash')
  , validator = require('validator');

module.exports = function (app) {
  function emailErrors(email, found, schema) {
    email = validator.trim(email);

    if (validator.isNull(email)) {
      return schema.email.required ? ['validate.user.email.required'] : [];
    }

    if (found && found.length) {
      return ['validate.user.email.unique'];
    }

    if (!validator.isEmail(email)) {
      if (schema.email.valid) return ['validate.user.email.valid'];
    }

    return [];
  }

  function passwordErrors(password, schema) {
    var errors = [];

    if (validator.isNull(password)) {
      return schema.password.required ? ['validate.user.password.required'] : [];
    }

    if (!validator.isLength(password, schema.password.minimumLength)) {
      if (schema.password.minimumLength) errors.push('validate.user.password.minimumLength');
    }

    if (!validator.isLength(password, 0, schema.password.maximumLength)) {
      if (schema.password.maximumLength) errors.push('validate.user.password.maximumLength');
    }

    return errors;
  }

  function usernameErrors(username, found, schema) {
    var errors = [];
    username = validator.trim(username);

    if (validator.isNull(username)) {
      return schema.username.required ? ['validate.user.username.required'] : [];
    }

    if (found && found.length) {
      return ['validate.user.username.unique'];
    }

    if (!validator.isAlphanumeric(username)) {
      if (schema.username.alphanumeric) errors.push('validate.user.username.alphanumeric');
    }

    if (!validator.isLength(username, schema.username.minimumLength)) {
      if (schema.username.minimumLength) errors.push('validate.user.username.minimumLength');
    }

    if (!validator.isLength(username, 0, schema.username.maximumLength)) {
      if (schema.username.maximumLength) errors.push('validate.user.username.maximumLength');
    }

    return errors;
  }

  function formErrors(email, emailExists, password, username, usernameExists, schema) {
    return emailErrors(email, emailExists, schema)
      .concat(passwordErrors(password, schema))
      .concat(usernameErrors(username, usernameExists, schema));
  }

  app.on('model', function (model) {
    model.fn('$validate.user.signup.email.errors', emailErrors);
    model.fn('$validate.user.signup.form.errors', formErrors);
    model.fn('$validate.user.signup.password.errors', passwordErrors);
    model.fn('$validate.user.signup.username.errors', usernameErrors);
  });
};