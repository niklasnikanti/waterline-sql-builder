var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('DELETE statements', function() {
    it('should generate an insert query', function(done) {
      Test({
        query: {
          del: true,
          from: 'accounts',
          where: {
            and: [
              {
                activated: false
              }
            ]
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'delete from "accounts" where "activated" = $1',
            bindings: [false]
          },
          {
            client: 'mysql',
            sql: 'delete from `accounts` where `activated` = ?',
            bindings: [false]
          }
        ]
      }, done);
    });
  });
});
