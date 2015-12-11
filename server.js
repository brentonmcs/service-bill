(function () {
  'use strict';

  var jobRunner = require('./jobRunner');
  var redis = require('./util/redis');
  var _ = require('lodash');

  // Start Known Jobs
  redis.hgetall('billsJobs', function (reply) {
    _.forEach(reply, function (item, key) {
      jobRunner.scheduleJob(JSON.parse(item));
    });
  });

  var routes = require('./routes');
})();
