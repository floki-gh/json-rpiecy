const JsonRpcEntity = require('./json-rpc-entity');
const Response = require('./response');
const RpcError = require('./error');
const parse = require('./parse');
const validate = require('./validate');
const readline = require('readline');

/**
 * Json Rpc Request 
 */
class Request extends JsonRpcEntity {
  constructor(method, params = null, id = null) {
    super();

    if (method && typeof method !== 'string') {
      throw new Error('"method" must be a string');
    } else if (method) {
      this.method = method;
    } else {
      throw new Error('"method" is required');
    }


    if (params && typeof params !== 'object') {
      throw new Error('"parms" must be an object or an array');
    } else {
      this.params = params;
    }

    if (id && !['string', 'number', 'null'].includes(typeof id)) {
      throw new Error('"id" must be a string a number or null');
    } else if (id) {
      this.id = id;
    }
  }

  /**
   * Send request to stdout, and await the response
   * @returns {Promise<Response>}
   */
  sendAndAwait() {
    this.output();
    return Request.waitFor(this.id);
  }

  /**
   * @param {object|any[]} result
   * @returns {Response<result>} - response for this request
   */
  response(result) {
    let resp = new Response(this.id, result);
    return resp;
  }

  /**
   * @param {string} message
   * @param {number|string} code
   * @param {any} data
   * @returns {Response<error>} - response for this request with error
   */
  error(message, code, data = null) {
    let resp = new Response(this.id, null, new RpcError(message, code, data));
    return resp;
  }

  /**
   * Check if request matches method
   * @param {rpiecy.Method} method 
   */
  matches(method) {
    return method.check(this);
  }
}


/**
 * @static
 * Waits for a response
 * @returns {Promise<Response>}
 */
Request.waitFor = function (id) {
  return new Promise((resolve, reject) => {
    const input = readline.createInterface({ input: rpiecy.stdio.input });
    input.on('line', line => {
      try {
        let parsed = parse.response(line);
        if (parsed.id === id && validate.response(parsed)) {
          if (parsed.error) {
            reject(parsed.error);
          } else {
            resolve(parsed);
          }
        }
      } catch (error) {

      }
    });
    input.on('SIGINT', () => {
      reject('SIGINT');
      input.close();
    });
  });
}

module.exports = Request;