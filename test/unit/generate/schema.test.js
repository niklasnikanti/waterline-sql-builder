var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('OPTS', function() {
    it('should support schemas', function(done) {
      Test({
        query: {
          select: ['title', 'author', 'year'],
          from: 'books',
          opts: {
            schema: 'foo'
          }
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'select "title", "author", "year" from "foo"."books"',
            bindings: []
          },
          {
            client: 'mysql',
            sql: 'select `title`, `author`, `year` from `foo`.`books`',
            bindings: []
          }
        ]
      }, done);
    });
  });
});
