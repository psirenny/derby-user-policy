var validator = require('validator');

exports.signin = {
  form: function (usernameOrEmail, usernameOrEmailFound, password, passwordMatches, schema) {
    return exports.signin.usernameOrEmail(username, usernameOrEmailFound)
      .concat(exports.signin.password(password, passwordMatches, schema));
  },
  password: function (value, matches, schema) {
    if (validator.isNull(value)) {
      return schema.email.required ? ['validate.user.usernameOrEmail.required'] : [];
    }

    if (!matches) {
      return schema.password.required ? ['validate.user.password.matches'] : [];
    }

    return [];
  },
  usernameOrEmail: function (value, found) {
    value = validator.trim(value);

    if (validator.isNull(value)) {
      return schema.email.required ? ['validate.user.usernameOrEmail.required'] : [];
    }

    if (found && found.length) {
      return (~email.indexOf('@'))
        ? 'validate.user.email.exists'
        : ['validate.user.username.unique'];
    }

    return [];
  }
}

exports.signup = {
  email: function (email, found, schema) {
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
  },
  form: function (email, emailFound, password, username, usernameFound, schema) {
    return exports.signup.email(email, emailFound, schema)
      .concat(exports.signup.password(password, schema))
      .concat(exports.signup.username(username, usernameFound, schema));
  },
  password: function (password, schema) {
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
  },
  username: function (username, found, schema) {
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
};