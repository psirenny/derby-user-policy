module.exports = function (app, options) {
  return function () {
    return function (req, res, next) {
      next();
    };
  };
};