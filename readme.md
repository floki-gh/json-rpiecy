# rpiecy - json-rpc v2 standard lib
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