(function () {
  'use strict';

  var app = require('express')();
  var redis = require('./util/redis');
  var _ = require('lodash');
  app.use(require('express-request-id')());

  app.post('/job', function (req, res) {
    redis.hset('billsJobs', req.body.job.name, req.body.job);
  });

  app.get('/health', function (req, res) {

    redis.hgetall(req.query.name, function (reply) {
      var result = [];
      _.forEach(reply, function (item, key) {
        result.push({
          time: key,
          health: JSON.parse(item)
        });
      });

      res.send(result);
    });
  });

  app.listen(3002);
})();
