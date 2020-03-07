var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('ORDER BY statements', function() {
    it('should generate a simple query with a FROM statement', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          orderBy: [{ name: 'desc' }, { age: 'asc' }]
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" order by "name" desc, "age" asc',
            bindings: []
          },
          {
            client: 'mysql',
            sql: 'select * from `users` order by `name` desc, `age` asc',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
