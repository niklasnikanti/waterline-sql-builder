var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('LIMIT statements', function() {
    it('should generate a simple query with a LIMIT statement', function(done) {
      Test({
        query: {
          select: ['id'],
          from: 'users',
          limit: 10
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select "id" from "users" limit $1',
            bindings: ['10']
          },
          {
            client: 'mysql',
            sql: 'select `id` from `users` limit ?',
            bindings: ['10']
          }
        ]
      }, done);
    });
  });
});
