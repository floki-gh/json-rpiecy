


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

Rpiecy is a lightweighted lib for managing [JSON-RPC](specifications.md) [objects][objects] and [comunication][comunication].


## Table Of Content
- [📫 rpiecy - JSON-RPC](#%F0%9F%93%AB-rpiecy---json-rpc)
  - [Table Of Content](#table-of-content)
  - [Api](#api)
    - [Methods](#methods)
      - [rpiecy.createRequest()](#rpiecycreaterequest)
      - [rpiecy.createResponse()](#rpiecycreateresponse)
      - [rpiecy.parse()](#rpiecyparse)
      - [rpiecy.listen(callback)](#rpiecylistencallback)
    - [Classes](#classes)
      - [Request](#request)
      - [Notification](#notification)
      - [Response](#response)
      - [RpcError](#rpcerror)
  - [Examples](#examples)

## Api
### Methods
#### rpiecy.createRequest()
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


#### rpiecy.createResponse()
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

#### rpiecy.parse()
Parses a json string into a [Request][rpiecy.Request] a [Notification][rpiecy.Notification] a [Response][rpiecy.Response] or an [Error][rpiecy.Error].  
Signature:
  * `rpiecy.parse(str)` 

#### rpiecy.listen(callback)
Listens for requests on specified server/input, check [this][rpiecy.Comunication] for more info.  
By default it uses stdio for listening and outputing

Signature:
  * `rpiecy.listen(callback)` 


### Classes
#### Request
A rpc call is represented by a Request object to a Server.

Signature:
  * `rpiecy.Request(method, params?, id?)`
    * **method** - `string`
    * **params?** - `object | array`
    * **id?** - `string | number | null`
  
  * `rpiecy.Request(object)`
    * **object** - `object`
    * **object.method?** - `string`
    * **object.params?** - `object | array`
    * **object.id?** - `string | number | null`

#### Notification
A Notification is a Request object without an "id" member. A Request object that is a Notification signifies the Client's lack of interest in the corresponding Response object, and as such no Response object needs to be returned to the client. The Server **MUST NOT** reply to a Notification, including those that are within a batch request.

#### Response
When a rpc call is made, the Server **MUST** reply with a **Response**, except for in the case of Notifications. 

Signature:
  * `rpiecy.Response(id, result?, error?)`
    * **id** - `string | number`
    * **result?** - `string` 
      * result may be omitted if error is passed
    * **error?** - `rpiecy.Error` 
      * will be omitted if result is valid
      * required if no result passed
  * `rpiecy.Response(object)`
    * **object** - `object`
    * **object.result?** - `object | array`
    * **object.error?** - `object | array`
    * **object.id?** - `string | number | null`

#### RpcError
When a rpc call encounters an error, the Response Object **MUST** contain the **error** member with a value that is a **RpcError**:
Signature:
  * `rpiecy.RpcError(message, code, data?)`
    * **message** - `string`
    * **code** - `number`
    * **data** - `object | array`
  * `rpiecy.RpcError(object)`
    * **object** - `object`
    * **object.message** - `string`
    * **object.code** - `number`
    * **object.data?** - `object | array`


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
