class Method {
  constructor(method_name, options = {}) {
    this.method_name = method_name;
    this.options = options;
  }


  check(request) {

    if (request.method !== this.method_name) return false;

    // Check parameters
    if (this.options.params && Object.keys(this.options.params).length) {
      let reqParams = request.params;
      for (let key in this.options.params) {
        let paramOpts = this.options.params[key];

        if (paramOpts.required && !(key in reqParams)) {
          throw new Error('Param "' + key + '" is required');
        }

        if (paramOpts.type && (typeof reqParams[key] !== paramOpts.type)) {
          throw new Error(`Parameter '${key}' must be type '${paramOpts.type}'. But was '${typeof reqParams[key]}'`);
        }

        if (paramOpts.pattern && !paramOpts.pattern.test(reqParams[key])) {
          throw new Error(`Parameter '${key}: ${reqParams[key]}' does not match pattern: '${paramOpts.pattern}'`);
        }
      }
    }

    return true;
  }
}

module.exports = Method;