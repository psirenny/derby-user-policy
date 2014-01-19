var _ = require('lodash')
  , config = require('./config.json');

module.exports = function (app, options) {
  return function () {
    options = _.defaults(options || {}, config);

    return function (req, res, next) {
      var model = req.getModel();
      model.set('$validate.user.rules', options.rules);
      model.set('$validate.user.schema', options.schema);
      next();
    };
  };
};