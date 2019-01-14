
const Request = require('./request');
const Response = require('./response');
const Notification = require('./notification');
const Method = require('./method');
const Error = require('./error');
const validate = require('./validate');
const parse = require('./parse');
const readline = require('readline');

const rpiecy = {
  Request,
  Response,
  Method,
  Notification,
  Error,
  validate: validate,
  parse: parse,

  /**
   * Creates a request
   * @param {string|{method: string, params?:object|any[], id?:string|number|null}} method 
   * @param {*} params 
   * @param {*} id 
   */
  createRequest(method, params = null, id = null) {
    // If first argument is an object 
    if (typeof method === 'object') {
      method = method.method;
      params = method.params;
      id = method.id;
    }

    let request = new Request(method, params, id);
    return request;
  },

  /**
   * Creates a response
   * @param {string|object} id 
   * @param {*} result 
   * @param {*} error 
   */
  createResponse(id, result = null, error = null) {
    if (typeof id === 'object') {
      result = id.result;
      error = id.error;
      id = id.id;
    }

    console.log({ id, result, error });
    let response = new Response(id, result, error);
    return response;
  },

  /**
   * 
   * @param {string} name 
   * @param {object} options 
   */
  createMethod(name, options) {
    return new Method(name, options);
  },

  /**
   * Returns a random id
   * @returns {string}
   */
  id() {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    const randS = () => Math.random().toString(36).substring(2, 10);
    return (randS());
  },

  stdio: {
    output(rpcEntity) {
      process.stdout.write(rpcEntity.toString() + '\n');
    },
    stdout: process.stdout,
    input: process.stdin
  },

  /**
   * @arg {function(Request, error)} callback 
   */
  listen(callback) {
    const input = readline.createInterface({ input: this.stdio.input, output: this.stdio.stdout });
    input.on('line', line => {
      if (line) {
        try {
          let parsed = parse(line);
          let responses = [];
          for (line of (parsed.length ? parsed : [parsed])) {
            if (line.method) {
              let res = callback(new Request(line.method, line.params, line.id));
              if (res instanceof Response) responses.push(res);
            }
          }
          if (responses.length > 1) {
            process.stdout.write(JSON.stringify(responses) + '\n');
          } else if (responses.length === 1) {
            responses[0].output();
          }
        } catch (error) {}
      }
    });
    input.on('SIGINT', () => {
      input.close();
    });
  },

  /**
   * Listens for a specific method
   * @param {Method} method 
   * @param {function(Request)} callback 
   */
  listenFor(method, callback) {
    this.listen((request) => {
      try {
        if (request.matches(method)) {
          return callback(request);
        }
      } catch (error) {
        request.error('error', 'INTERNAL_ERROR', { error: error.toString() }).output();
      }
    });
  }
};

global.rpiecy = rpiecy;
module.exports = rpiecy;