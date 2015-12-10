(function () {
  'use strict';
  var winston = require('winston');
  var logger = new(winston.Logger)({
    transports: [
      new(winston.transports.Console)({
        colorize: 'all',
        timestamp: true,
        // level: 'warn',
      }),
      new(winston.transports.File)({
        filename: 'output.log',

      }),
    ],
    exceptionHandlers: [
      new(winston.transports.Console)({
        colorize: 'all',
      }),
      new winston.transports.File({
        filename: 'exceptions.log',
      }),
    ],
  });

  module.exports = logger;
})();
