var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('WHERE NOT EQUAL statements', function() {
    it('should generate a query with a WHERE NOT EQUAL statement', function(done) {
      Test({
        query: {
          select: ['id'],
          from: 'users',
          where: {
            and: [
              {
                firstName: {
                  '!=': 'Test'
                }
              },
              {
                lastName: {
                  '!=': 'User'
                }
              }
            ]
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select "id" from "users" where "firstName" != $1 and "lastName" != $2',
            bindings: ['Test', 'User']
          },
          {
            client: 'mysql',
            sql: 'select `id` from `users` where `firstName` != ? and `lastName` != ?',
            bindings: ['Test', 'User']
          }
        ]
      }, done);
    });

    it('should generate a query when nested WHERE NOT statements are used', function(done) {
      Test({
        query: {
          select: '*',
          from: 'users',
          where: {
            or: [
              {
                or: [
                  {
                    id: {
                      '!=': 1
                    }
                  },
                  {
                    id: {
                      '<': 10
                    }
                  }
                ]
              },
              {
                name: {
                  '!=': 'Tester'
                }
              }
            ]
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where ("id" != $1 or "id" < $2) or "name" != $3',
            bindings: ['1', '10', 'Tester']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where (`id` != ? or `id` < ?) or `name` != ?',
            bindings: ['1', '10', 'Tester']
          }
        ]
      }, done);
    });

    it('should generate a query when multiple operators are used', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            or: [
              { name: 'John' },
              {
                votes: { '>': 100 },
                title: {
                  '!=': 'Admin'
                }
              }
            ]
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where "name" = $1 or ("votes" > $2 and "title" != $3)',
            bindings: ['John', '100', 'Admin']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where `name` = ? or (`votes` > ? and `title` != ?)',
            bindings: ['John', '100', 'Admin']
          }
        ]
      }, done);
    });

    it('should generate a query when an AND array is used', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            and: [
              {
                name: 'John'
              },
              {
                title: {
                  '!=': 'Admin'
                }
              }
            ]
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where "name" = $1 and "title" != $2',
            bindings: ['John', 'Admin']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where `name` = ? and `title` != ?',
            bindings: ['John', 'Admin']
          }
        ]
      }, done);
    });
  });
});
