module.exports = function (app, options) {
  return {
    init: require('./init')(app, options),
    routes: require('./routes')(app, options)
  };
};