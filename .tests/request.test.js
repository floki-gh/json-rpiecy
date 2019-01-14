const rpiecy = require('../lib/rpiecy');
const base = require('./base');

describe('Request tests', () => {
  it(`Should be defined`, () => {
    expect(rpiecy.Request).toBeDefined();
  });

  let req = new rpiecy.Request('method', { data: 'test' }, 'my-id');
  base.fnExist(['toString', 'toObject', 'print', 'output', 'sendAndAwait', 'request', 'error', 'matches'], req);

  it(`Should create correct request and .toObject working`, () => {
    let req = new rpiecy.Request('method', { data: 'test' }, 'my-id');
    expect(req.toObject()).toEqual({
      jsonrpc: '2.0',
      method: 'method',
      params: {
        data: 'test'
      },
      id: 'my-id'
    });
  });

  it(`.toString working`, () => {
    let req = new rpiecy.Request('method', { data: 'test' }, 'my-id');
    expect(req.toString()).toEqual('{"jsonrpc":"2.0","method":"method","params":{"data":"test"},"id":"my-id"}');
  });

  it(`handle bad parameters`, () => {
    expect(() => {
      new rpiecy.Request(123, { data: 'test' }, 'my-id');
    }).toThrow();
    expect(() => {
      new rpiecy.Request('123', 123, 'my-id');
    }).toThrow();
    expect(() => {
      new rpiecy.Request('123', { data: 'test' }, {});
    }).toThrow();
  });
});
