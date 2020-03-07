var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('INSERT statements', function() {
    it('should generate an insert query', function(done) {
      Test({
        query: {
          insert: {
            title: 'Slaughterhouse Five'
          },
          into: 'books'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'insert into "books" ("title") values ($1)',
            bindings: ['Slaughterhouse Five']
          },
          {
            client: 'mysql',
            sql: 'insert into `books` (`title`) values (?)',
            bindings: ['Slaughterhouse Five']
          }
        ]
      }, done);
    });

    it('should generate an insert query when using multiple values', function(done) {
      Test({
        query: {
          insert: {
            title: 'Slaughterhouse Five',
            author: 'Kurt Vonnegut'
          },
          into: 'books'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'insert into "books" ("author", "title") values ($1, $2)',
            bindings: ['Kurt Vonnegut', 'Slaughterhouse Five']
          },
          {
            client: 'mysql',
            sql: 'insert into `books` (`author`, `title`) values (?, ?)',
            bindings: ['Kurt Vonnegut', 'Slaughterhouse Five']
          }
        ]
      }, done);
    });

    it('should generate an insert query when using an array of values', function(done) {
      Test({
        query: {
          insert: [
            {
              title: 'Slaughterhouse Five',
              author: 'Kurt Vonnegut'
            },
            {
              title: 'The Great Gatsby',
              author: 'F. Scott Fitzgerald'
            }
          ],
          into: 'books'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'insert into "books" ("author", "title") values ($1, $2), ($3, $4)',
            bindings: ['Kurt Vonnegut', 'Slaughterhouse Five', 'F. Scott Fitzgerald', 'The Great Gatsby']
          },
          {
            client: 'mysql',
            sql: 'insert into `books` (`author`, `title`) values (?, ?), (?, ?)',
            bindings: ['Kurt Vonnegut', 'Slaughterhouse Five', 'F. Scott Fitzgerald', 'The Great Gatsby']
          }
        ]
      }, done);
    });
  });
});
