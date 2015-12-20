(function () {
  'use strict';

  var app = require('express')();
  var redis = require('./util/redis');

  app.use(require('express-request-id')());

  app.get('/health/:service', function (req, res) {
    redis.hget('health', req.params.service, function (summary) {
      res.send(summary);
    });
  });

  app.listen(3002);
})();
