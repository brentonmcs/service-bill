(function () {

  var request = require('request');
  var logger = require('./util/logger');
  var redis = require('.//util/redis');

  var scheduleJob = function (scheduledJob, serviceName) {
    setTimeout(function () {
      var newJob = scheduledJob;
      jobRunner(newJob, serviceName);
    }, scheduledJob.timeout);
  };

  var jobRunner = function (newJob, serviceName) {
    var responseHandler = function (error, response, body) {
      var result = {
        name: newJob.name,
        responseTime: new Date() - start,
        start: start
      };

      if (error) {
        result.code = error.code;
        logger.info("Error ", result);
      } else {
        result.code = response.statusCode;
        logger.info("Success", result);
      }

      redis.hset(serviceName, start, result);
      scheduleJob(newJob, serviceName);
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

  module.exports.serviceJobs = function (service) {

    for (var i = 0; i < service.jobs.length; i++) {
      jobRunner(service.jobs[i], service.name);
    }
  };

})();
