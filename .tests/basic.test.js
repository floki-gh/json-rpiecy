/**
 * A set of very basic tests
 */

const rpiecy = require('../lib/rpiecy');
const base = require('./base');

describe('Library should be exported and defined', () => {
  it(`Be exported`, () => {
    expect(rpiecy).toBeDefined();
  });

  base.fnExist(['createRequest', 'createResponse', 'parse', 'id'], rpiecy);
});


