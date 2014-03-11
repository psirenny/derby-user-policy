var _ = require('lodash')
  , config = require('./config.json');

module.exports = function (app, options) {
  return function () {
    options = _.merge(options || {}, config);

    return function (req, res, next) {
      var model = req.getModel();
      var schema = model.get('$user.schema') || {};
      model.set('$validate.user.rules', options.rules);
      model.set('$user.schema', _.merge(options.schema, schema));
      next();
    };
  };
};