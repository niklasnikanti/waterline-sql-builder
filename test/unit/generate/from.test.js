var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('FROM statements', function() {
    it('should generate a simple query with a FROM statement', function(done) {
      Test({
        query: {
          select: ['*'],
          from: 'books'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select * from "books"',
            bindings: []
          },
          {
            client: 'mysql',
            sql: 'select * from `books`',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
