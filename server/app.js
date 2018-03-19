'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing


// var env_config = require('./config.js').get(process.env.NODE_ENV);

var config;
var yaml_path = process.env.DOCPATH;
var port = process.env.PORT;

if (!yaml_path || !port) {
  throw "Please pass env variable 'DOCPATH' and 'PORT";
}

// if (yaml_path) {
//   config = {
//     appRoot: __dirname, // required config
//     swaggerFile: __dirname + '/' + yaml_path
//   };
// } else {
//   config = {
//     appRoot: __dirname // required config
//   };
// }

config = {
    appRoot: __dirname, // required config
    swaggerFile: __dirname + '/' + yaml_path
};


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  app.listen(port);
  console.info('Mock_server: listen actual port:' + port);
  console.info('Mock_server: with actual file:' + config.swaggerFile);
  

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
