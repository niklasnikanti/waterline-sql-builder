var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('COUNT statements', function() {
    it('should generate a count query', function(done) {
      Test({
        query: {
          count: true,
          from: 'users'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select count(*) from "users"',
            bindings: []
          },
          {
            client: 'mysql',
            sql: 'select count(*) from `users`',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
