(function () {
  'use strict';

  var Redis = require('ioredis');
  var client = new Redis();

  client.config('set', 'notify-keyspace-events', 'Ksh');

  var logger = require('./logger');
  client.on('error', function (err) {
    logger.log('info', 'Redis Error', err);
  });

  module.exports = {
    keys: function (exp, callback) {
      client.keys(exp, function (err, reply) {
        callback(reply);
      });
    },
    hset: function (hash, key, obj) {
      client.hset(hash, key, JSON.stringify(obj));
    },
    hget: function (hash, key, callback) {
      client.hget(hash, key, function (err, reply) {
        callback(JSON.parse(reply));
      });
    },
    hgetall: function (hash, callback) {
      client.hgetall(hash, function (err, reply) {
        callback(reply);
      });
    },
    removeAll: function (callback) {
      client.flushall(callback);
    },
    setDatabase: function (databaseVersion) {
      client.select(databaseVersion);
    },
    subscribe: function (keyspace, callback) {
      var pubsub = client.duplicate();
      pubsub.psubscribe('__keyspace@*__:' + keyspace);
      pubsub.on('pmessage',callback);
    }
  };
})();
