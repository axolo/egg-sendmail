'use strict';

const mock = require('egg-mock');

describe('test/sendmail.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/sendmail-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, sendmail')
      .expect(200);
  });
});
