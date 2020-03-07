var Test = require('../../support/test-runner');

describe('Query Generation ::', function() {
  describe('RETURNING statements', function() {
    it('should generate an returning query', function(done) {
      Test({
        query: {
          insert: {
            title: 'Slaughterhouse Five'
          },
          into: 'books',
          returning: 'author'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'insert into "books" ("title") values ($1) returning "author"',
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

    it('should generate a returning query when using multiple values', function(done) {
      Test({
        query: {
          insert: {
            title: 'Slaughterhouse Five',
            author: 'Kurt Vonnegut'
          },
          into: 'books',
          returning: ['author', 'title']
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'insert into "books" ("author", "title") values ($1, $2) returning "author", "title"',
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

    it('should generate an returning query returning all values if possible', function(done) {
      Test({
        query: {
          insert: {
            title: 'Slaughterhouse Five'
          },
          into: 'books',
          returning: '*'
        },
        outcomes: [
          {
            client: 'postgresql',
            sql: 'insert into "books" ("title") values ($1) returning *',
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
  });
});
