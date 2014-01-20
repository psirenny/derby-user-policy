var validator = require('validator');

exports.changeEmail = {
  email: function (value, found, schema) {
    var errors = [];
    value = validator.trim(value);

    if (validator.isNull(value)) {
      return ['validate.user.email.required'];
    }

    if (found && found.length) {
      return value === found[0].local.email
        ? ['validate.user.email.changed']
        : ['validate.user.email.unique']
    }

    if (!validator.isEmail(value)) {
      if (schema.email.valid) return ['validate.user.email.valid'];
    }

    return [];
  }
};

exports.changePassword = {
  confirmPassword: function (value1, value2, schema) {
    var errors = [];

    if (validator.isNull(value1)) return;

    if (validator.isNull(value2)) {
      return ['validate.user.confirmPassword.required'];
    }

    if (!validator.equals(value1, value2)) {
      return ['validate.user.confirmPassword.matches'];
    }

    if (!validator.isLength(value2, schema.password.minimumLength)) {
      if (schema.password.minimumLength) errors.push('validate.user.password.minimumLength');
    }

    if (!validator.isLength(value2, 0, schema.password.maximumLength)) {
      if (schema.password.maximumLength) errors.push('validate.user.password.maximumLength');
    }

    return errors;
  },
  form: function (password, confirmPassword, schema) {
    return
      exports.changePassword.password(password, schema)
      .concat(exports.changePassword.confirmPassword(password, confirmPassword));
  },
  password: function (value, schema) {
    var errors = [];

    if (validator.isNull(value)) {
      return schema.password.required ? ['validate.user.password.required'] : [];
    }

    if (!validator.isLength(value, schema.password.minimumLength)) {
      if (schema.password.minimumLength) errors.push('validate.user.password.minimumLength');
    }

    if (!validator.isLength(value, 0, schema.password.maximumLength)) {
      if (schema.password.maximumLength) errors.push('validate.user.password.maximumLength');
    }

    return errors;
  },
};

exports.changeUsername = {
  username: function (value, found, schema) {
    var errors = [];
    value = validator.trim(value);

    if (validator.isNull(value)) {
      return ['validate.user.username.required'];
    }

    if (found && found.length) {
      return value === found[0].local.username
        ? ['validate.user.username.changed']
        : ['validate.user.username.unique']
    }

    if (!validator.isAlphanumeric(value)) {
      if (schema.username.alphanumeric) errors.push('validate.user.username.alphanumeric');
    }

    if (!validator.isLength(value, schema.username.minimumLength)) {
      if (schema.username.minimumLength) errors.push('validate.user.username.minimumLength');
    }

    if (!validator.isLength(value, 0, schema.username.maximumLength)) {
      if (schema.username.maximumLength) errors.push('validate.user.username.maximumLength');
    }

    return errors;
  }
};

exports.forgotPassword = {
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

exports.resetPassword = exports.changePassword;

exports.signin = {
  form: function (usernameOrEmail, usernameOrEmailFound, password, passwordMatches, schema) {
    return
      exports.signin.usernameOrEmail(username, usernameOrEmailFound)
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
};

exports.signup = {
  email: function (value, found, schema) {
    value = validator.trim(value);

    if (validator.isNull(value)) {
      return schema.email.required ? ['validate.user.email.required'] : [];
    }

    if (found && found.length) {
      return ['validate.user.email.unique'];
    }

    if (!validator.isEmail(value)) {
      if (schema.email.valid) return ['validate.user.email.valid'];
    }

    return [];
  },
  form: function (email, emailFound, password, username, usernameFound, schema) {
    return
      exports.signup.email(email, emailFound, schema)
      .concat(exports.signup.password(password, schema))
      .concat(exports.signup.username(username, usernameFound, schema));
  },
  password: function (value, schema) {
    var errors = [];

    if (validator.isNull(value)) {
      return schema.password.required ? ['validate.user.password.required'] : [];
    }

    if (!validator.isLength(value, schema.password.minimumLength)) {
      if (schema.password.minimumLength) errors.push('validate.user.password.minimumLength');
    }

    if (!validator.isLength(value, 0, schema.password.maximumLength)) {
      if (schema.password.maximumLength) errors.push('validate.user.password.maximumLength');
    }

    return errors;
  },
  username: function (value, found, schema) {
    var errors = [];
    value = validator.trim(value);

    if (validator.isNull(value)) {
      return schema.username.required ? ['validate.user.username.required'] : [];
    }

    if (found && found.length) {
      return ['validate.user.username.unique'];
    }

    if (!validator.isAlphanumeric(value)) {
      if (schema.username.alphanumeric) errors.push('validate.user.username.alphanumeric');
    }

    if (!validator.isLength(value, schema.username.minimumLength)) {
      if (schema.username.minimumLength) errors.push('validate.user.username.minimumLength');
    }

    if (!validator.isLength(value, 0, schema.username.maximumLength)) {
      if (schema.username.maximumLength) errors.push('validate.user.username.maximumLength');
    }

    return errors;
  }
};