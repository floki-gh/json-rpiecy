


<!-- Links -->
[npm-image]: https://img.shields.io/npm/v/json-rpiecy.svg?style=flat-square
[npm-url]: https://npmjs.org/package/json-rpiecy

[code-quality-badge]: http://npm.packagequality.com/shield/json-rpiecy.svg?style=flat-square
[code-quality-link]: https://packagequality.com/#?package=json-rpiecy

[downloads-badge]: https://img.shields.io/npm/dm/json-rpiecy.svg?style=flat-square
[downloads-link]: https://www.npmjs.com/package/json-rpiecy

[dependencies-badge]: https://img.shields.io/david/nombrekeff/json-rpiecy.svg?style=flat-square
[dependencies-link]: https://david-dm.org/nombrekeff/json-rpiecy?view=tree

[vulnerabilities-badge]: https://snyk.io/test/npm/loggin-js/badge.svg?style=flat-square
[vulnerabilities-link]: https://snyk.io/test/npm/loggin-js

# 📫 rpiecy - JSON-RPC 

[![NPM version][npm-image]][npm-url]
[![NPM quality][code-quality-badge]][code-quality-link]
[![Downloads][downloads-badge]][downloads-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-link]

rpiecy is a lightweighted lib for managing [JSON-RPC](specifications.md) [objects][objects] and [comunication][comunication].

## Examples
```js
const rpiecy = require('rpiecy');

const request1 = rpiecy.createRequest('method', { /* params */ }, 'id');
const request2 = rpiecy.createRequest({ method: 'method', params: {}, id: 'id' });
request1.print();
request2.output();


const response1 = rpiecy.createResponse('id', { /* result */ });
const response2 = rpiecy.createResponse({ result: { }, id: 'id' });
response1.print();
response2.output();

const parsed = rpiecy.parse('{"method": "method", "id": "id", "jsonrpc": "2.0"}');


request1.sendAndAwait()
  .then(response => {
    console.log(`Response for ${request.id}: `, response);
  })

rpiecy.listen((request) => {
  console.log(`Received request ${request.id}: `, request);
});

```

# Api
## rpiecy members
### rpiecy.createRequest()
Accepts a set of arguments, and returns a [rpiecy.Request][rpiecy.Request] instance.  
Signatures: 
  * `rpiecy.createRequest(method, params?, id?)`
    * **method** - `string`
    * **params?** - `object | array`
    * **id?** - `string | number | null`
  
  * `rpiecy.createRequest(object)`
    * **object** - `object`
    * **object.method?** - `string`
    * **object.params?** - `object | array`
    * **object.id?** - `string | number | null`


### rpiecy.createResponse()
Accepts a set of arguments, and returns a [rpiecy.Response][rpiecy.Response] instance.  
Signatures: 
  * `rpiecy.createResponse(id, result?, error?)`
    * **id** - `string | number`
    * **result?** - `string` 
      * result may be omitted if error is passed
    * **error?** - `rpiecy.Error` 
      * will be omitted if result is valid
      * required if no result passed
  * `rpiecy.createResponse(object)`
    * **object** - `object`

### rpiecy.parse()
Parses a json string into a [Request][rpiecy.Request] a [Notification][rpiecy.Notification] a [Response][rpiecy.Response] or an [Error][rpiecy.Error].  
Signature:
  * `rpiecy.parse(str)` 

### parse.error
### parse.response
### parse.request
### parse.notification

### rpiecy.listen(callback)
Listens for requests on specified server/input, check [this][rpiecy.Comunication] for more info.  
By default it uses stdio for listening and outputing

Signature:
  * `rpiecy.listen(callback)` 


<!-- links -->
[objects]: docs/specifications.md#list-of-objects
[comunication]: docs/specifications.md#comunication
[createRequest]: docs/api.md#rpiecy.createRequest
[createResponse]: docs/api.md#rpiecy.createResponse
[rpiecy.Request]: docs/api.md#rpiecy.Request
[rpiecy.Response]: docs/api.md#rpiecy.Response
[rpiecy.Notification]: docs/api.md#rpiecy.Notification
[rpiecy.Error]: docs/api.md#rpiecy.Error
[rpiecy.Comunication]: docs/api.md#rpiecy.Comunication
