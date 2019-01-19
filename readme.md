


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
  - [Installing](#installing)
  - [Usage](#usage)
    - [Require](#require)
    - [ES6 Import](#es6-import)
  - [Api](#api)
    - [Methods](#methods)
      - [rpiecy.createRequest()](#rpiecycreaterequest)
      - [rpiecy.createResponse()](#rpiecycreateresponse)
      - [rpiecy.parse()](#rpiecyparse)
      - [rpiecy.listen(callback)](#rpiecylistencallback)
    - [Classes](#classes)
      - [rpiecy.Request](#rpiecyrequest)
      - [rpiecy.Notification](#rpiecynotification)
      - [rpiecy.Response](#rpiecyresponse)
      - [rpiecy.RpcError](#rpiecyrpcerror)
  - [Examples](#examples)


## Installing
The easiest way of installing is using npm:
```
$ npm i json-rpiecy -s
```
Or using yarn:
```
$ yarn add json-rpiecy
```

## Usage
### Require
Using node require:
```js
const rpiecy = require('json-rpiecy');
```

### ES6 Import
Using es6 imports:
```js
import * as rpiecy from 'json-rpiecy';
```

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
#### rpiecy.Request
A rpc call is represented by a **Request** object.

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

Methods:
  * `.response(result: object): Response<result>` - creates a **Response** object for this request  
  * `.error(message: string, code: number, data?:any): Response<error>` - creates an **Response** with error for this request
  * `.error(error?: object): Response<error>` - overload for accepting an object as first argument
  * `.matches(method: string): boolean` - Check if request matches method
  * `.sendAndAwait(): Promise<Response>` - Sends a request to set output channel, and awaits the response

#### rpiecy.Notification
A Notification is a Request object without an "id" member. A Request object that is a Notification signifies the Client's lack of interest in the corresponding Response object, and as such no Response object needs to be returned to the client. The Server **MUST NOT** reply to a Notification, including those that are within a batch request.

#### rpiecy.Response
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

#### rpiecy.RpcError
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

Static Constants:
  * `Error.INTERNAL_ERROR` = **-32603**
  * `Error.INVALID_PARAMS` = **-32602**
  * `Error.METHOD_NOT_FOUND` = **-32601**
  * `Error.INVALID_REQUEST` = **-32600**
  * `Error.PARSE_ERROR` = **-32700**
  * `Error.TIMED_OUT` = **-32001**

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
  request.response({ data: SOME_DATA }).output();
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
