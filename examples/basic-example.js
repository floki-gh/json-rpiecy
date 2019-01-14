const rpiecy = require('../lib/rpiecy');
const request1 = rpiecy.createRequest('method', { /* params */ }, 'id');
const request2 = rpiecy.createRequest({ method: 'method', params: {}, id: 'id' });
request1.print();
request2.output();


const response1 = rpiecy.createResponse('id', { /* result */ });
const response2 = rpiecy.createResponse({ result: {}, id: 'id' });
response1.print();
response2.output();

const parsed = rpiecy.parse('{"method": "method", "id": "id", "jsonrpc": "2.0"}');


request1.sendAndAwait()
  .then(response => {
    console.log(`Response for ${request1.id}: `, response);
  })


const method = rpiecy.createMethod('test-method', {
  // params: {
  //   // username: { type: 'string', required: true },
  //   // password: { type: 'string', required: true },
  //   // otp: { type: 'string', required: true, pattern: /\d{4}-\d{4}/g },
  // }
});
rpiecy.listenFor(method, (request) => {
  console.log(`> Received request ${request.id}: `, request);
  request.response({
    data: {
      token: "asdasdsadad"
    }
  }).output();
});
// {"jsonrpc":"2.0","method":"test-method","params":{ "username": "string", "password": "string" },"id":"id"}
// {"jsonrpc":"2.0","method":"test-method","params":{ "username": "string", "password": 1223 },"id":"id"}
// {"jsonrpc":"2.0","method":"test-method","params":{ "username": "string", "password": "1223", "otp": "1234-1234" },"id":"id"}
// [{"jsonrpc":"2.0","method":"test-method","params":{ },"id":"id"}, {"jsonrpc":"2.0","method":"test-method","params":{ },"id":"id"}]