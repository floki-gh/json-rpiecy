const Request = require('./request');

class Notification extends Request {
  constructor(method, params = null) {
    super(method, params);
  }
}

module.exports = Notification;