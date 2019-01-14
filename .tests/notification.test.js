const rpiecy = require('../lib/rpiecy');
const base = require('./base');

describe('Notification tests', () => {
  it(`Should be defined`, () => {
    expect(rpiecy.Notification).toBeDefined();
  });

  let req = new rpiecy.Notification('log', { message: 'test' });
  base.fnExist(['toString', 'toObject'], req);

  it(`Should create correct Notification and .toObject working`, () => {
    let req = new rpiecy.Notification('log', { message: 'test' });
    expect(req.toObject()).toEqual({
      jsonrpc: '2.0',
      method: 'log',
      params: {
        message: 'test'
      }
    });
  });

  it(`.toString working`, () => {
    let req = new rpiecy.Notification('log', { message: 'test' });
    expect(req.toString()).toEqual('{"jsonrpc":"2.0","method":"log","params":{"message":"test"}}');
  });

  it(`handle bad parameters`, () => {
    expect(() => {
      new rpiecy.Notification(123, { message: 'test' });
    }).toThrow();
    expect(() => {
      new rpiecy.Notification('123', 123);
    }).toThrow();
  });
});
