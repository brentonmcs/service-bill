(function() {

  var request = require('request');
  var logger = require('./logger');
  var redis = require('./redis');

  var jobRunner = function (newJob) {

    var responseHandler = function (error, response, body) {
      if (error) {
        logger.info("Error ", { name : newJob.name, code: error.code, responseTime: new Date() - start});
      } else {
        logger.info("Success", {name : newJob.name, code: response.statusCode, responseTime: new Date() - start});
      }
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
