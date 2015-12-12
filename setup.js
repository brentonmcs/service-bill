(function () {
  'use strict';

  var redis = require('./util/redis');

  var services = [{
    name: "AccountService",
    jobs: [{
      name: "GetAccount",
      httpVerb: "GET",
      uri: "http://localhost:3001/Account?clientId=123",
      timeout: 40000
    }, {
      name: "CreateAccount",
      httpVerb: "POST",
      uri: "http://localhost:3001/Account",
      timeout: 40000,
      header: {
        "channel": 302
      }
    }]
  }, {
    name: "HistoryService",
    jobs: [{
      name: "GetHistory",
      httpVerb: "GET",
      uri: "http://localhost:3001/History",
      timeout: 40000
    }]
  }];

  for (var i = 0, len = services.length; i < len; i++) {
    redis.hset('billsServices', services[i].name, services[i]);
  }

})();