(function () {

  var jobRunner = require('./jobRunner');

  var jobList = [{
    name: "GetAccount",
    httpVerb: "GET",
    uri: "http://localhost:3001/Account?clientId=123",
    timeout: 1000
  }, {
    name: "GetLiveStream",
    httpVerb: "GET",
    uri: "http://localhost:3001/LiveStream",
    timeout: 4000
  }, {
    name: "CreateAccount",
    httpVerb: "POST",
    uri: "http://localhost:3001/Account",
    timeout: 4000,
    header: {
      "svc-channel": 302
    }
  }];

  for (var i = 0, len = jobList.length; i < len; i++) {
    jobRunner.scheduleJob(jobList[i]);
  }
})();
