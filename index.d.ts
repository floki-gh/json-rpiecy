// Type definitions for json-rpiecy 0.0.1

/**
 * JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. 
 */
declare namespace rpiecy {
  /**
   * Creates a new request object for you
   * If no id is passed it will generate one for you
   */
  function createRequest(method: string, params?: object | any[], id?: string | number | null): rpiecy.Request;
  function createRequest(obj: rpiecy.RequestObject): rpiecy.Request;

  /**
   * 
   */
  function createResponse(id: string | number, result?: object | any[], error?: rpiecy.Error): rpiecy.Response;
  function createResponse(obj: rpiecy.ResponseObject): rpiecy.Response;


  type Request = rpiecy.Request;
  type Response = rpiecy.Response;
  type Id = string | number;
  type Code = -32603 | -32602 | -32601 | -32600 | -32700 | -32001;

  /**
   * 
   */
  interface Request {
    jsonrpc: string;
    method: string;
    params?: object | any[];
    id?: string | number | null;
  }

  interface RequestObject {
    jsonrpc?: string;
    method: string;
    params?: object | any[];
    id?: string | number | null;
  }

  interface ResponseObject {
    jsonrpc?: string;
    id: string | number | null;
    result?: object | any[]
    error?: rpiecy.Error
  }

  interface Response {
    jsonrpc: string;
    id: string | number | null;
    result?: object | any[]
    error?: rpiecy.Error
  }

  interface Error {
    message: string;
    code: rpiecy.Code;
    data?: object | any[];
  }
}
