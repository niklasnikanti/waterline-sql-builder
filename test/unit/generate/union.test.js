var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('UNION statements', function() {
    it('should generate a UNION query', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            and: [
              {
                firstName: 'Bob'
              }
            ]
          },
          union: [
            {
              select: ['*'],
              from: 'users',
              where: {
                and: [
                  {
                    lastName: 'Smith'
                  }
                ]
              }
            },
            {
              select: ['*'],
              from: 'users',
              where: {
                and: [
                  {
                    middleName: 'Allen'
                  }
                ]
              }
            }
          ]
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where "firstName" = $1 union (select * from "users" where "lastName" = $2) union (select * from "users" where "middleName" = $3)',
            bindings: ['Bob', 'Smith', 'Allen']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where `firstName` = ? union (select * from `users` where `lastName` = ?) union (select * from `users` where `middleName` = ?)',
            bindings: ['Bob', 'Smith', 'Allen']
          }
        ]
      }, done);
    });
  });
});
