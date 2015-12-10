(function () {

  var jobRunner = require('./jobRunner');
  var redis = require('./util/redis');
  var _ = require('lodash');
  // var jobListLegacy = [{
  //   name: "GetAccount",
  //   httpVerb: "GET",
  //   uri: "http://localhost:3001/Account?clientId=123",
  //   timeout: 1000
  // }, {
  //   name: "GetLiveStream",
  //   httpVerb: "GET",
  //   uri: "http://localhost:3001/LiveStream",
  //   timeout: 4000
  // }, {
  //   name: "CreateAccount",
  //   httpVerb: "POST",
  //   uri: "http://localhost:3001/Account",
  //   timeout: 4000,
  //   header: {
  //     "svc-channel": 302
  //   }
  // }];
  //
  // for (var i = 0, len = jobListLegacy.length; i < len; i++) {
  //     redis.hset('billsJobs', jobListLegacy[i].name, jobListLegacy[i]);
  // }

  redis.hgetall('billsJobs', function (reply) {
    _.forEach(reply, function (item, key) {

      var json = JSON.parse(item);
      jobRunner.scheduleJob(json);
    });
  });


})();
