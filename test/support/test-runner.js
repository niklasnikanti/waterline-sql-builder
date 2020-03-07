/**
 * Given a db flavor and a query object, generate the SQL statement and test
 * it against the expected outcome.
 */

var assert = require('assert');
var async = require('async');
var GeneratorFn = require('../../index');

module.exports = function(test, cb) {
  var testDialect = function testDialect(outcome, next) {
    var generator = GeneratorFn({ client: outcome.client });
    var results = generator.generate(test.query);

    try {
      assert.equal(results.sql, outcome.sql, outcome.client);
      if (outcome.bindings) {
        assert.deepEqual(results.bindings, outcome.bindings, outcome.client);
      }
    } catch (e) {
      e.client = outcome.client;
      return cb(e);
    }

    return async.setImmediate(function() {
      next();
    });
  };

  async.each(test.outcomes, testDialect, cb);
};
