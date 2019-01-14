
class JsonRpcEntity {
  constructor() {
    this.jsonrpc = '2.0';
  }

  toString() {
    return JSON.stringify(this.toObject());
  }

  toObject() {
    let object = {};
    for (let key of Object.getOwnPropertyNames(this)) {
      object[key] = this[key];
    }
    return object;
  }

  print() {
    console.log(`{`);
    for (let key of Object.getOwnPropertyNames(this)) {
      console.log(`  ${key}:`, this[key], '\b,');
    }
    console.log(`}`);
  }

  output() {
    // rpiecy.notifier.output(this);
    rpiecy.stdio.output(this);
  }
}

module.exports = JsonRpcEntity;