const JsonRpcEntity = require('./json-rpc-entity');

class RpcError extends JsonRpcEntity {
  constructor(message, code, data = null) {
    super();
    if (message && typeof message !== 'string') {
      throw new Error('"message" must be a string');
    } else if (message) {
      this.message = message;
    } else {
      throw new Error('"message" is required');
    }

    if (code) {
      if (this[code]) {
        this.code = this[code];
      }
      else {
        this.code = code;
      }
    } else {
      throw new Error('"code" is required');
    }

    if (data && typeof data !== 'object') {
      throw new Error('"data" must be a object or an array');
    } else {
      this.data = data;
    }

    delete this.jsonrpc;
  }
}

Error.INTERNAL_ERROR = -32603;
Error.INVALID_PARAMS = -32602;
Error.METHOD_NOT_FOUND = -32601;
Error.INVALID_REQUEST = -32600;
Error.PARSE_ERROR = -32700;
Error.TIMED_OUT = -32001;

module.exports = RpcError;