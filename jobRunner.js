(function () {

  var request = require('request');

  var scheduleJob = function (scheduledJob, serviceName) {
    setTimeout(function () {
      var newJob = scheduledJob;
      jobRunner(newJob, serviceName);
    }, scheduledJob.timeout);
  };

  var jobRunner = function (newJob, serviceName) {

    function responseHandler(error, response, body) {

      console.log(body);
      require('./responseChecker').validateResponse(error, response, body, newJob, serviceName);
    }

    newJob.start = new Date();
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

    scheduleJob(newJob, serviceName);
  };

  module.exports.serviceJobs = function (service) {
    for (var i = 0; i < service.jobs.length; i++) {
      jobRunner(service.jobs[i], service.name);
    }
  };

})();
