(function() {

  var request = require('request');
  var logger = require('./util/logger');
  var redis = require('.//util/redis');

  var jobRunner = function (newJob) {

    var responseHandler = function (error, response, body) {
      var result = {};
      if (error) {
        result = { name : newJob.name, code: error.code, responseTime: new Date() - start};
        logger.info("Error ", result);
      } else {
        result = {name : newJob.name, code: response.statusCode, responseTime: new Date() - start};
        logger.info("Success", result);
      }

      redis.hset(newJob.name, start, result);
      scheduleJob(newJob);
    };

    var start = new Date();

    var options = {
      url: newJob.uri,
      headers: newJob.header
    };
    if (newJob.httpVerb === "GET") {
      request.get(options, responseHandler);
    }

    if (newJob.httpVerb === "POST") {
      request.post(options, responseHandler);
    }
  };

  var scheduleJob = function (scheduledJob) {
    setTimeout(function () {
      var newJob = scheduledJob;
      jobRunner(newJob);
    }, scheduledJob.timeout);
  };

  module.exports = {
    scheduleJob : scheduleJob
  };

})();
