var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('LIKE operator ::', function() {
    it('should generate a LIKE query', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            or: [
              {
                name: {
                  like: '%Test%'
                }
              },
              {
                id: {
                  nin: [1, 2, 3]
                }
              }
            ]
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where "name" like $1 or "id" not in ($2, $3, $4)',
            bindings: ['%Test%', '1', '2', '3']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where `name` like ? or `id` not in (?, ?, ?)',
            bindings: ['%Test%', '1', '2', '3']
          }
        ]
      }, done);
    });
  });
});
