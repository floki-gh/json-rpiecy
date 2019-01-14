const JsonRpcEntity = require('./json-rpc-entity');
const validate = require('./validate');

class Response extends JsonRpcEntity {
  constructor(id, result, error) {
    super();

    if (id && !['string', 'number', 'null'].includes(typeof id)) {
      throw new Error('"id" must be a string a number or null: ' + id);
    } else if (id) {
      this.id = id;
    } else {
      throw new Error('"id" is required');
    }

    if (!error && !result) {
      throw new Error('"result" is required if no error is passed');
    }

    if (!error && result) {
      this.result = result;
    }

    if (error && !validate.error(error)) {
      throw new Error('"error" is not correct format, check this <insert_link>');
    }

    if (error) {
      this.error = error;
      delete this.result;
    }
  }
}

module.exports = Response;