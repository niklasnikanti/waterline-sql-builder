var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('Grouping statements with OR', function() {
    it('should generate a query when an OR statement is present', function(done) {
      Test({
        query: {
          select: ['*'],
          where: {
            or: [
              {
                id: { '>': 10 }
              },
              {
                name: 'Tester'
              }
            ]
          },
          from: 'users'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where "id" > $1 or "name" = $2',
            bindings: ['10', 'Tester']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where `id` > ? or `name` = ?',
            bindings: ['10', 'Tester']
          }
        ]
      }, done);
    });

    it('should generate a query when a nested OR statement is used', function(done) {
      Test({
        query: {
          select: ['*'],
          where: {
            or: [
              {
                or: [
                  { id: 1 },
                  { id: { '>': 10 } }
                ]
              },
              {
                name: 'Tester'
              }
            ]
          },
          from: 'users'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where ("id" = $1 or "id" > $2) or "name" = $3',
            bindings: ['1', '10', 'Tester']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where (`id` = ? or `id` > ?) or `name` = ?',
            bindings: ['1', '10', 'Tester']
          }
        ]
      }, done);
    });
  });
});
