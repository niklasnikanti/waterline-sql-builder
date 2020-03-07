var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('Grouping statements with AND', function() {
    it('should generate a query when an AND statement is used as an array', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            and: [
              {
                firstName: 'foo'
              },
              {
                lastName: 'bar'
              }
            ]
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where "firstName" = $1 and "lastName" = $2',
            bindings: ['foo', 'bar']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where `firstName` = ? and `lastName` = ?',
            bindings: ['foo', 'bar']
          }
        ]
      }, done);
    });

    it('should generate a query when a nested OR statement is used', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'users',
          where: {
            and: [
              {
                or: [
                  {
                    firstName: 'John'
                  },
                  {
                    lastName: 'Smith'
                  }
                ]
              },
              {
                or: [
                  {
                    qty: {
                      '>': 100
                    }
                  },
                  {
                    price: {
                      '<': 10.01
                    }
                  }
                ]
              }
            ]
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "users" where ("firstName" = $1 or "lastName" = $2) and ("qty" > $3 or "price" < $4)',
            bindings: ['John', 'Smith', '100', '10.01']
          },
          {
            client: 'mysql',
            sql: 'select * from `users` where (`firstName` = ? or `lastName` = ?) and (`qty` > ? or `price` < ?)',
            bindings: ['John', 'Smith', '100', '10.01']
          }
        ]
      }, done);
    });
  });
});
