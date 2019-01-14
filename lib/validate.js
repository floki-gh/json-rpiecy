const validate = {};

validate.error = (error) => {
  return true;
};

validate.request = (request) => {
  return true;
};

validate.response = (response) => {
  return true;
};

validate.notification = (notification) => {
  return true;
};

module.exports = validate;