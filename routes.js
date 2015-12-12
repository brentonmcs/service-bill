(function () {
  'use strict';

  var app = require('express')();
  var redis = require('./util/redis');
  var _ = require('lodash');
  require('./lodash.math')(_); //Waiting for a PR to fix a bug with the latest version

  app.use(require('express-request-id')());

  app.get('/health/:service', function (req, res) {

    function getHealth(stats, responseTimes) {
      var healthy = 'green';
      var healthCount = 0;

      _.forEach(responseTimes, function (resp) {
        var fromStd = (resp.health.responseTime - stats.avgResponse) / stats.stdDev;
        if (fromStd > 1.5) {
          healthCount++;
        }

        if (resp.health.code >= 400) {
          healthCount += 3;
        }
      });

      return healthCount > 5 ? 'red' : healthCount >=1 ? 'amber' : 'green';
    }

    redis.hgetall(req.params.service, function (reply) {
      var result = [];
      _.forEach(reply, function (item, key) {
        result.push({
          time: key,
          health: JSON.parse(item)
        });
      });

      var summary = [];

      _.forEach(_.groupBy(result, 'health.name'), function (item, key) {

        var respTimes = _.pluck(item, 'health.responseTime');
        var sortedItems = _.sortBy(item, 'health.start');

        var stats = {
          name: key,
          lastCheck: _.last(_.pluck(sortedItems, 'health.start')),
          maxResponse: _.max(respTimes),
          minResponse: _.min(respTimes),
          stdDev: _.stdDeviation(respTimes),
          avgResponse: _.average(respTimes),
          responseCount: respTimes.length
        };

        stats.health = getHealth(stats, _.takeRight(sortedItems, 5));
        summary.push(stats);
      });

      res.send(summary);
    });
  });

  app.listen(3002);
})();
