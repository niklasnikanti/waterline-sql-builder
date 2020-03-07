var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('SKIP statements', function() {
    it('should generate a simple query with a SKIP statement', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          skip: 10
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" offset $1',
            bindings: ['10']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` limit 18446744073709551615 offset ?',
            bindings: ['10']
          }
        ]
      }, done);
    });
  });
});
