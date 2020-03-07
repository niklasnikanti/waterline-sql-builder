var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('AVG statements', function() {
    it('should generate a avg query', function(done) {
      Test({
        query: {
          avg: 'active',
          from: 'users'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select avg("active") from "users"',
            bindings: []
          },
          {
            client: 'mysql',
            sql: 'select avg(`active`) from `users`',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
