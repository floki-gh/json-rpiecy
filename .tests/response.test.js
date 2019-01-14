const rpiecy = require('../lib/rpiecy');
const base = require('./base');


describe('Response tests', () => {
  it(`Should be defined`, () => {
    expect(rpiecy.Response).toBeDefined();
  });

  let res = new rpiecy.Response('log', { message: 'test' });
  base.fnExist(['toString', 'toObject', 'print', 'output'], res);

  it(`handle bad parameters`, () => {
    expect(() => {
      new rpiecy.Response();
    }).toThrow();

    expect(() => {
      new rpiecy.Response('123');
    }).toThrow('"result" is required if no error is passed');

    expect(() => {
      new rpiecy.Response('123', null, {});
    }).not.toThrow();
  });

  it(`Should create correct Response and .toObject working`, () => {
    let req = new rpiecy.Response('my-id', { data: 'test' });
    expect(req.toObject()).toEqual({
      jsonrpc: '2.0',
      result: {
        data: 'test'
      },
      id: 'my-id'
    });
  });

  it(`.toString working`, () => {
    let req = new rpiecy.Response('method', { data: 'test' });
    expect(req.toString()).toEqual('{"jsonrpc":"2.0","id":"method","result":{"data":"test"}}');
  });



});
