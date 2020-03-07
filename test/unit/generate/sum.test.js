var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('SUM statements', function() {
    it('should generate a sum query', function(done) {
      Test({
        query: {
          sum: 'active',
          from: 'users'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select sum("active") from "users"',
            bindings: []
          },
          {
            client: 'mysql',
            sql: 'select sum(`active`) from `users`',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
