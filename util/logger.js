(function () {
  'use strict';
  var winston = require('winston');
  var logger = new(winston.Logger)({
    transports: [
      new(winston.transports.Console)({
        colorize: 'all',
        timestamp: true
      }),
      new(winston.transports.File)({
        filename: 'logs/output.log',

      }),
    ],
    exceptionHandlers: [
      new(winston.transports.Console)({
        colorize: 'all',
        humanReadableUnhandledException: true,
      }),
      new winston.transports.File({
        filename: 'logs/exceptions.log',
      }),
    ],
  });

  module.exports = logger;
})();
