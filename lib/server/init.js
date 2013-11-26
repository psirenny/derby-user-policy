var _ = require('lodash');

module.exports = function (app, options) {
  return function () {
    options = _.defaults(options || {}, {
      schema: {
        email: {
          maxLength: 50,
          minLength: 5,
          required: true
        },
        password: {
          maxLength: 60,
          minLength: 6,
          required: true
        },
        username: {
          allowSpaces: false,
          allowSymbols: false,
          maxLength: 30,
          minLength: 3,
          required: true
        }
      }
    });

    return function (req, res, next) {
      var model = req.getModel();
      model.set('$user.policy.schema', options.schema);
      next();
    };
  };
};