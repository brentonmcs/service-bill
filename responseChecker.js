(function () {

  var redis = require('.//util/redis');
  var logger = require('./util/logger');
  var Validator = require('jsonschema').Validator;
  var v = new Validator();

  var responseHandler = function (error, response, body, job, serviceName) {
    var result = {
      name: job.name,
      responseTime: new Date() - job.start,
      start: job.start
    };

    if (error) {
      result.code = error.code;
      logger.info("Error ", result);
    } else {
      result.code = response.statusCode;
      logger.info("Success", result);
    }

    if (job.jsonSchema) {
        var validateJson = v.validate(JSON.parse(body), job.jsonSchema);
        if (validateJson.errors && validateJson.errors.length > 0) {
          result.error = "Json failed";
          result.code = 500;
        }
    }

    redis.hset(serviceName, job.start, result);

  };

  module.exports = {
    validateResponse : responseHandler
  };
})();
