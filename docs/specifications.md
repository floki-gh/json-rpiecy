<!-- Document is based of https://www.jsonrpc.org/specification -->

<!-- Things to take into account:
* Easy interface
* Follow standard 100%
* Tested -->

# Overview
JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. 
Primarily this specification defines several data structures and the rules around their processing. 
It is transport agnostic in that the concepts can be used within the same process, over sockets, over http, or in many various message passing environments. 
It uses [JSON][1] ([RFC 4627][2]) as data format.


It is designed to be simple!

# Conventions
The key words **"MUST"**, **"MUST NOT"**, **"REQUIRED"**, **"SHALL"**, **"SHALL NOT"**, **"SHOULD"**, **"SHOULD NOT"**, **"RECOMMENDED"**, **"MAY"**, **and** **"OPTIONAL"** in this document are to be interpreted as described in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt).

Since JSON-RPC utilizes JSON, it has the same type system (see http://www.json.org or [RFC 4627][2]). JSON can represent four primitive types (Strings, Numbers, Booleans, and Null) and two structured types (Objects and Arrays). The term "Primitive" in this specification references any of those four primitive JSON types. The term "Structured" references either of the structured JSON types. Whenever this document refers to any JSON type, the first letter is always capitalized: Object, Array, String, Number, Boolean, Null. True and False are also capitalized.

All member names exchanged between the Client and the Server that are considered for matching of any kind should be considered to be case-sensitive. The terms function, method, and procedure can be assumed to be interchangeable.

The Client is defined as the origin of Request objects and the handler of Response objects. 
The Server is defined as the origin of Response objects and the handler of Request objects. 

One implementation of this specification could easily fill both of those roles, even at the same time, to other different clients or the same client. This specification does not address that layer of complexity.

# Compatibility
JSON-RPC 2.0 Request objects and Response objects may not work with existing JSON-RPC 1.0 clients or servers. However, it is easy to distinguish between the two versions as 2.0 always has a member named "jsonrpc" with a String value of "2.0" whereas 1.0 does not. Most 2.0 implementations should consider trying to handle 1.0 objects, even if not the peer-to-peer and class hinting aspects of 1.0.


# List of objects

## 1. Request
A rpc call is represented by sending a Request object to a Server. The Request object has the following members:
* **jsonrpc** * String
* **method**  * String
* **params**  * Array | Object
* **id**      * String | Number | Null

### 1.1. Notifcation
A Notification is a Request object without an "id" member. A Request object that is a Notification signifies the Client's lack of interest in the corresponding Response object, and as such no Response object needs to be returned to the client. The Server **MUST NOT** reply to a Notification, including those that are within a batch request.
* **jsonrpc**
* **method** 
* **params**

#### Parameter Structures
If present, parameters for the rpc call **MUST** be provided as a Structured value. Either by-position through an Array or by-name through an Object.
* **by-position**: params **MUST** be an Array, containing the values in the Server expected order.
* **by-name**: params **MUST** be an Object, with member names that match the Server expected parameter names. The absence of expected names **MAY** result in an error being generated. The names MUST match exactly, including case, to the method's expected parameter

## 2. Response
When a rpc call is made, the Server **MUST** reply with a Response, except for in the case of Notifications. 
The Response is expressed as a single JSON Object, with the following members:
* **jsonrpc**
* **id**
* **result** * This member **MUST NOT** exist if there was an error invoking the method
* **error**  * This member **MUST NOT** exist if there was no error triggered during invocation.

### 2.1. Error
* code * This **MUST** be an **integer**.
  * **-32700**	Parse error	Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.
  * **-32600**	Invalid Request	The JSON sent is not a valid Request object.
  * **-32601**	Method not found	The method does not exist / is not available.
  * **-32602**	Invalid params	Invalid method parameter(s).
  * **-32603**	Internal error	Internal JSON-RPC error.
  * **-32000** to -32099	Server error	Reserved for implementation-defined server-errors.
* message * String
* data    * A Primitive or Structured value that contains additional information about the error. This **may** be omitted.

### Batch
To send several Request objects at the same time, the Client **MAY** send an Array filled with Request objects.

The Server should respond with an Array containing the corresponding Response objects, after all of the batch Request objects have been processed. A Response object **SHOULD** exist for each Request object, except that there **SHOULD NOT** be any Response objects for notifications. The Server **MAY** process a batch rpc call as a set of concurrent tasks, processing them in any order and with any width of parallelism.

The Response objects being returned from a batch call **MAY** be returned in any order within the Array. The Client **SHOULD** match contexts between the set of Request objects and the resulting set of Response objects based on the id member within each Object.

If the batch rpc call itself fails to be recognized as an valid JSON or as an Array with at least one value, the response from the Server **MUST** be a single Response object. If there are no Response objects contained within the Response array as it is to be sent to the client, the server **MUST NOT** return an empty Array and should return nothing at all.

## Comunication
...TODO...





> This document was based of: https://www.jsonrpc.org/specification

[1]: http://www.json.org/ 
[2]: http://www.ietf.org/rfc/rfc4627.txt